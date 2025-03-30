import  {githubCallback, loginController, registerController } from "../controllers/authController";
import { validateGithubCode } from "../middlewares/githubMiddleware";
import express  from "express";

const router = express.Router();


router.post('/login', loginController );
router.post('/register', registerController );

router.get('/git/callback',validateGithubCode, githubCallback)

export default router;