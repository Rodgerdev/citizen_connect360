import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import dbHelper from '../DatabaseHelpers';
import { Payload } from '../Models/UserModel'; // Adjust the import path as necessary

export const addIncident = async (req: Request, res: Response) => {
    const { title, description, multimedia } = req.body;
    const userId = (req.user as Payload).Sub; // Use the Payload interface
    const id = uuidv4();

    try {
        await dbHelper.exec('addIncident', { id, title, description, multimedia, userId });
        res.status(201).json({ message: 'Incident added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add incident', details: error });
    }
};

export const getIncidents = async (req: Request, res: Response) => {
    try {
        const result = await dbHelper.exec('getIncidents', {});
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get incidents', details: error });
    }
};

export const updateIncident = async (req: Request, res: Response) => {
    const { id, title, description, multimedia } = req.body;

    try {
        await dbHelper.exec('updateIncident', { id, title, description, multimedia });
        res.json({ message: 'Incident updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update incident', details: error });
    }
};

export const deleteIncident = async (req: Request, res: Response) => {
    const { id } = req.body;

    try {
        await dbHelper.exec('deleteIncident', { id });
        res.json({ message: 'Incident deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete incident', details: error });
    }
};
