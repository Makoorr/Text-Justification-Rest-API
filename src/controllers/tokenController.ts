import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
const uuid = require('uuid');

export const auth = (req: Request, res: Response) => {
    const email: string = req.body.email;
    const mockDatabase: string[] = ["user1@mail.com", "user2@mail.com", "user3@mail.com",];
    
    try {
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
    } catch (error) {
        res.status(400).send("Bad request.");
    }
};