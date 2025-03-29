import jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.SESSION_SECRET!;

export const generateToken = (userId:string): string => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    }
    catch (error) {
        throw new Error('Invalid token');
    }
};

