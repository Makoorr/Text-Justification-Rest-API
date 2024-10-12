import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { mockDatabase } from '../database/users';
const uuid = require('uuid');

export const auth = (req: Request, res: Response) => {
    const email: string = req.body.email;
    
    if (mockDatabase.includes(email)) {
        // 1. Generation du payload pour le token
        const payload = {
            id: uuid.v4(),
            login: email,
        };
        const secret = process.env.JWT_SECRET || 'secret'

        // 2. Génération du token
        const token = jwt.sign(payload, secret, {
            // expriation du token
            expiresIn: '10h'
        })  

        // 3. send token
        res.send({ token })
    } else {
        res.status(401).send('Unauthorized');
    }
};