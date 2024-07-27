from langchain.agents import create_sql_agent
from langchain.agents.agent_toolkits import SQLDatabaseToolkit
from langchain.sql_database import SQLDatabase
from langchain.chat_models import ChatOpenAI
from langchain.agents.agent_types import AgentType
import os
from dotenv import load_dotenv

load_dotenv()

KEY = os.getenv('KEY')

uri = os.getenv('uri')

database = SQLDatabase.from_uri(uri)
# i want to use GPT 3.5 or 4
llm = ChatOpenAI(model="gpt-3.5-turbo", openai_api_key=KEY)

toolkit = SQLDatabaseToolkit(db=database, llm=llm)
agent_executor = create_sql_agent(
    llm=llm,
    toolkit=toolkit,
    agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True,
    prefix="You are an AI that interacts with a MSSQL database and is supposed to summarize"
)

# Create a text-processing agent for PDF content
text_agent = ChatOpenAI(model="gpt-3.5-turbo", openai_api_key=KEY)
