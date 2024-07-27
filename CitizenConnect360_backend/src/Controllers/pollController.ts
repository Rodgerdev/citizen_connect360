import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import dbHelper from '../DatabaseHelpers';

export const addPoll = async (req: Request, res: Response) => {
    const { question, options } = req.body;
    const id = uuidv4();

    try {
        await dbHelper.exec('addPoll', { id, question, options: JSON.stringify(options) });
        res.status(201).json({ message: 'Poll added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add poll', details: error });
    }
};

export const getPolls = async (req: Request, res: Response) => {
    try {
        const result = await dbHelper.exec('getPolls', {});
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get polls', details: error });
    }
};

export const updatePoll = async (req: Request, res: Response) => {
    const { id, question, options } = req.body;

    try {
        await dbHelper.exec('updatePoll', { id, question, options: JSON.stringify(options) });
        res.json({ message: 'Poll updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update poll', details: error });
    }
};

export const deletePoll = async (req: Request, res: Response) => {
    const { id } = req.body;

    try {
        await dbHelper.exec('deletePoll', { id });
        res.json({ message: 'Poll deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete poll', details: error });
    }
};
