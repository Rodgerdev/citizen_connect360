import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../Config';
import { Payload } from '../Models/UserModel'; // Adjust the import path as necessary

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ error: 'No token provided, authorization denied' });
    }

    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(403).json({ error: 'Token is not valid' });
        }

        req.user = payload as Payload;
        next();
    });
};

export const authorizeRoles = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ error: 'No token provided, authorization denied' });
        }

        if (!roles.includes(user.role)) {
            return res.status(403).json({ error: `Role '${user.role}' is not authorized to access this resource` });
        }

        next();
    };
};
