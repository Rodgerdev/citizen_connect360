from flask import Flask, jsonify, request
from dotenv import load_dotenv
from models import agent_executor, text_agent
import pyodbc
import os
import uuid
from PyPDF2 import PdfReader
from langchain.schema import AIMessage
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})  # Explicitly set the allowed origin

load_dotenv('.env')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

USERNAME = 'sa'

connectionString = f"""
    DRIVER={{ODBC Driver 17 for SQL Server}};
    SERVER={os.getenv('SERVER')};
    DATABASE={os.getenv('DATABASE')};
    UID={USERNAME};
    PWD={os.getenv('PASSWORD')};
"""

def query_db(query, params=(), fetch=True):
    conn = pyodbc.connect(connectionString)     
    cursor = conn.cursor()      
    cursor.execute(query, params)

    if fetch:
        columns = [column[0] for column in cursor.description]
        results = []
        for row in cursor.fetchall():
            results.append(dict(zip(columns, row)))
        conn.close()
        return results
    else:
        conn.commit()
        conn.close()
        return None

@app.route('/users', methods=['GET'])
def get_users():
    getUsers = f"SELECT * FROM Users"
    try:
        data = query_db(getUsers)    
        return jsonify(data), 200
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500

@app.route('/users/<user_id>', methods=['GET'])
def get_user(user_id):
    getUser = f"SELECT * FROM Users WHERE id=?"
    try:
        data = query_db(getUser, (user_id,))    
        return jsonify(data), 200
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500

@app.route('/users/add-user', methods=['POST'])
def register_user():
    if not request.is_json:
        return jsonify({"error": "Invalid input, JSON required"}), 400

    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')

    id = str(uuid.uuid4())

    if not all([id, name, email, password, role]):
        return jsonify({"error": "Missing data"}), 400

    registerUser = """
        INSERT INTO Users (id, name, email, password, role) 
        VALUES (?, ?, ?, ?, ?)
    """
    
    try:
        query_db(registerUser, (id, name, email, password, role), fetch=False)
        return jsonify({"message": "User created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/educate-chat', methods=['POST'])
def educate_chat():
    if not request.is_json:
        return jsonify({"error": "Invalid input, JSON required"}), 400

    data = request.get_json()
    id = str(uuid.uuid4())
    userId = data.get('userId')
    query = data.get('query')

    if not all([userId, query]):
        return jsonify({"error": "Missing query parameter"}), 400

    try:
        answer = agent_executor(query)
        questionAsked = answer.get('input')
        answerGiven = answer.get('output')
        print(f"THIS IS THE RESPONSE {answerGiven}")

        addChat = """
        INSERT INTO aiChats (id, userId, query, response) 
        VALUES (?, ?, ?, ?)
        """

        query_db(addChat, (id, userId, query, answerGiven), fetch=False)
        return jsonify({"response": answerGiven}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/previous-chats', methods=['GET'])
def previous_chats():
    user_id = request.args.get('userId')
    getChats = """
    EXEC getAiChatsByUserId @userId=?
    """

    try:
        data = query_db(getChats, (user_id,))
        return jsonify({'chats': data}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def read_pdf(pdf_path):
    text = ""
    try:
        with open(pdf_path, 'rb') as file:
            reader = PdfReader(file)
            for page in reader.pages:
                text += page.extract_text()
    except Exception as e:
        print(f"Error reading PDF: {e}")
    return text

def split_text_into_chunks(text, chunk_size=2000):
    words = text.split()
    chunks = []
    for i in range(0, len(words), chunk_size):
        chunks.append(' '.join(words[i:i+chunk_size]))
    return chunks

@app.route('/pdf-chat', methods=['POST'])
def pdf_chat():
    if not request.is_json:
        return jsonify({"error": "Invalid input, JSON required"}), 400

    data = request.get_json()
    id = str(uuid.uuid4())
    userId = data.get('userId')
    pdfTitle = data.get('pdfTitle')
    query = data.get('query')

    if not all([userId, pdfTitle, query]):
        return jsonify({"error": "Missing query parameter"}), 400

    try:
        pdf_path = os.path.join('pdfs', f"{pdfTitle}.pdf")
        pdf_text = read_pdf(pdf_path)
        if not pdf_text:
            return jsonify({"error": f"PDF '{pdfTitle}' not found or is empty"}), 404

        chunks = split_text_into_chunks(pdf_text)
        answers = []

        for chunk in chunks:
            full_query = f"PDF Chunk: {chunk}\n\nUser Query: {query}"
            response = text_agent.invoke([{"role": "user", "content": full_query}])
            
            if isinstance(response, AIMessage):
                answers.append(response.content)
            else:
                return jsonify({"error": "Unexpected response format"}), 500

        combined_answer = ' '.join(answers)
        print(f"THIS IS THE RESPONSE {combined_answer}")

        addChat = """
        INSERT INTO aiChats (id, userId, query, response) 
        VALUES (?, ?, ?, ?)
        """

        query_db(addChat, (id, userId, query, combined_answer), fetch=False)
        return jsonify({"response": combined_answer}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
