import { Request, Response, NextFunction } from 'express'
import {check, validationResult} from 'express-validator'

export const validateGithub = [ 
    check('code').notEmpty().withMessage('Authorization code is required'),

    (req: Request, res: Response, next: NextFunction)=>{
        const err = validationResult(req);
        if(!err.isEmpty()){
            return res.status(400).json({errors: err.array()});
        }
        next()
    }
]