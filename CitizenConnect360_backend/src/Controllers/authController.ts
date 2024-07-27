import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dbHelper from '../DatabaseHelpers';
import { JWT_SECRET } from '../Config';
import { sendPasswordResetEmail, sendRegistrationEmail } from '../Nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { Payload } from '../Models/UserModel'; 

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const register = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const existingUser = await dbHelper.exec('getUserByEmail', { email });
        if (existingUser.recordset.length > 0) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        await dbHelper.exec('addUser', { id, name, password: hashedPassword, email });
        await sendRegistrationEmail(email, name);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user', details: error });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const result = await dbHelper.exec('getUserByEmail', { email });
        const user = result.recordset[0];

        if (!user || user.isDeleted) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const payload: Payload = {
            Sub: user.id,
            Name: user.name,
            role: user.role
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.json({ 
            token,
            user: {
                id: user.id,
                username: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Failed to log in', details: error });
    }
};


export const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await dbHelper.exec('getUsers', {});
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to get users', details: error});
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        const result = await dbHelper.exec('getUserByEmail', { email });
        const user = result.recordset[0];

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const token = jwt.sign({ Sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        const resetLink = `http://thejitu.com/reset-password?token=${token}`;
        
        await sendPasswordResetEmail(email, resetLink);

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send password reset email', details: error });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await dbHelper.exec('deleteUser', { id });

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user', details: error });
    }
};