import { Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { RequestWithEmail } from '../interfaces/auth';

export const isAuth = (req: RequestWithEmail, res: Response, next: Function) => {
    // 1. get token from headers
    // token format: "Bearer <token>"
    const authorization = req.headers['authorization'];

    if (!authorization) {
        return res.status(401).send('Unauthorized');
    }
    if (authorization.split(' ').length !== 2) {
        return res.status(401).send('Unauthorized');
    }

    if (authorization.split(' ')[0] !== 'Bearer') {
        return res.status(401).send('Unauthorized');
    }

    const token = authorization ? authorization.split(' ')[1] : '';

    try {
        // 2. validate token
        const secret = process.env.JWT_SECRET || 'secret';
        const payload = jwt.verify(token, secret);

        // 3. if valid, continue + set req.user
        req.user = payload;
        next()
    } catch (e) {
        return res.status(401).send('Unauthorized');
    }
}