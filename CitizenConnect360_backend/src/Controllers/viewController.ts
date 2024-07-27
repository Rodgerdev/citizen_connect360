import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import dbHelper from '../DatabaseHelpers';
import { Payload } from '../Models/UserModel'; 

export const addView = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const userId = (req.user as Payload).Sub; 
    const id = uuidv4();

    try {
        await dbHelper.exec('addView', { id, title, description, userId });
        res.status(201).json({ message: 'View added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add view', details: error });
    }
};

export const getViews = async (req: Request, res: Response) => {
    try {
        const result = await dbHelper.exec('getViews', {});
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get views', details: error });
    }
};

export const updateView = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const { id } = req.params;

    if (!id || !title || !description) {
        return res.status(400).json({ error: 'Missing required fields: id, title, and description are required' });
    }

    try {
        await dbHelper.exec('updateView', { id, title, description });
        res.json({ message: 'View updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update view', details: error });
    }
};

export const deleteView = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Missing required field: id is required' });
    }

    try {
        await dbHelper.exec('deleteView', { id });
        res.json({ message: 'View deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete view', details: error });
    }
};
