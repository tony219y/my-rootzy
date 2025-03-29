import { Request, Response } from 'express';
import { login, register } from '../services/authServices';

export const loginController = async (req: Request, res: Response)=>{
    try {
        const { email, password } = req.body;
        const token = login(email, password);
        res.json({ email, password });

    } catch (error) {
        res.status(400)
    }
};
export const registerController = async (req: Request, res: Response)=>{
    try {
        const {username, email, password, name } = req.body;
        await register(name, username, email, password);
        res.status(201).json({ message: 'User created' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

