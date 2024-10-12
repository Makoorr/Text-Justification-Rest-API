import { NextFunction, Response } from "express";
import { connectedUsers } from "../database/users";
import * as jwt from "jsonwebtoken";
import { RequestWithUser } from "../interfaces/auth";

export const rateLimitMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const authorization = req.headers['authorization'];
    try {
        const token = authorization ? authorization.split(' ')[1] : '';
        const payload: any = jwt.decode(token);
        const userEmail = payload.email;

        const currentTokenUsage = connectedUsers[userEmail];
        const currentDate = new Date();

        // Vérification de dernière date d'utilisation de ce token
        if (currentTokenUsage) {
            const lastResetDate = currentTokenUsage.lastReset;
            if (lastResetDate.getDate() !== currentDate.getDate() || lastResetDate.getMonth() !== currentDate.getMonth() || lastResetDate.getFullYear() !== currentDate.getFullYear()) {
                currentTokenUsage.wordCount = 0;
                currentTokenUsage.lastReset = currentDate;
            }
        }

        if (!currentTokenUsage) {
            connectedUsers[userEmail] = {
                token: token,
                wordCount: 0,
                lastReset: currentDate
            };
        }

        const text = req.body.text || '';
        const wordCount = text.length;

        if (connectedUsers[userEmail].wordCount + wordCount > 80000) {
            return res.status(402).json({ error: 'Payment Required' });
        }

        connectedUsers[userEmail].wordCount += wordCount;
        next();
    } catch (error) {
        return res.status(401).send('Unauthorized');
    }
};