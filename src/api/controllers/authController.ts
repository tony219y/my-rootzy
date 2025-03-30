import e, { Request, Response } from 'express';
import { login, register, registerGithub } from '../services/authServices';
import { githubAuthService } from '../services/githubAuthService';

export const loginController = async (req: Request, res: Response)=>{
    try {
        const { email, password } = req.body;
        const token = await login(email, password);
        res.json({token});

    } catch (error) {
        res.status(400).json({message: "The email or password provided is incorrect."});
    }
};
export const registerController = async (req: Request, res: Response)=>{
    try {
        const {username, email, password, confirmPassword, fullname } = req.body;
        await register(fullname,username, email, password,confirmPassword , );
        res.status(201).json({ message: 'User created' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};


//Github Oauth
export const githubCallback = async (req: Request, res: Response) =>{
    const code = req.query.code;
    console.log('code: ',code)
    if (typeof code !== 'string') {
        res.status(400).send('Missing or invalid code');
        return;
      }
    
      try {
        const [user,email] = await githubAuthService.getUserInfoFromGitHub(code);
        console.log({user,email})
        const response = await registerGithub({
            fullname: user.name,
            username: user.login,
            email: email[0].email,
            password: user.id.toString(),
            confirmPassword: '',
            authMethod: 'github',
            avatar: user.avatar_url,
            githubId: user.id
        });
        // console.log("response from Database: ", response)
        const token = await login(email[0].email,user.id) 
        if(token){
            res.status(201).redirect(`http://localhost:3000/home/?token=${token}`);
        }
      } catch (error:any) {
        console.error(error)
         res.status(400).redirect(`http://localhost:3000/home`);
      }

}

