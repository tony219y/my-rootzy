import {Request, Response, NextFunction} from 'express'

export const validateGithubCode = (req: Request, res: Response,next: NextFunction): void =>{
    const {code} = req.query;
    if(!code){
        res.status(400).send('Missing authorization code!')
        return;
    }
    console.log('\x1b[32mValidation Pass!\x1b[0m');


    next()
}