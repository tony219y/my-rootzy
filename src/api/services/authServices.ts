import { User } from '../models/schema'
import { eq, or } from 'drizzle-orm'
import { db } from '../../config/connectDB'
import { generateToken } from '../helper/jwtHelper'
import { sql } from 'drizzle-orm';
import bcrypt from 'bcrypt'

//check if user exists or not in the database
export const login = async (email: string, password: string) => {
    // ตรวจสอบว่า email และ password ไม่เป็น null หรือ undefined
    if (!email || !password) {
        console.log("Invalid form!");
        throw new Error("Email and password are required");
    }

    const users = await db.select().from(User).where(eq(User.email, email));
    console.log({ users });

    if (users.length === 0) throw new Error('User not found');

    // ตรวจสอบรหัสผ่านกับค่า hashed ในฐานข้อมูล
    const checkPassword = await bcrypt.compare(password, users[0].password);
    if (!checkPassword) throw new Error('Invalid password');

    // หากผ่านการตรวจสอบแล้วให้สร้าง token
    return generateToken(users[0].id.toString());
}

//register a new user

export interface UserData {
    fullname: string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    avatar: string,
    githubId: string,
    authMethod: "github" | "local" | "google";
}
export const register = async (fullname:string,username:string, email:string, password:string, confirmPassword:string) => {


    //username or email are already exists
    const validate_user = await db
    .select()
    .from(User)
    .where(
        sql`(${User.email} = ${email}) OR (${User.username} = ${username})`
    );
    if (validate_user.length > 0) throw new Error("Username or Email already exists!");

    if (!isNaN(Number(username.charAt(0)))) throw new Error("Username cannot start with a number!");

    if (password.length < 8) throw new Error("Password must be at least 8 characters long!");

    if(password !== confirmPassword) throw new Error("Password not match!")


    const hash = await bcrypt.hash(password, 10)
    const response = await db.insert(User)
        .values({
            name: fullname,
            username: username,
            email: email,
            password: hash,
            authMethod:'local',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
    if (!response) throw new Error('User not created')
    return response
}


//register for Github
export const registerGithub = async (userData: UserData) => {

    const { fullname, username, email, password, confirmPassword, githubId, } = userData;

    //username or email are already exists
    const validate_user = await db
    .select()
    .from(User)
    .where(
        sql`(${User.email} = ${email}) OR (${User.username} = ${username})`
    );
    if (validate_user.length > 0) throw new Error("Username or Email already exists!");

    const hash = await bcrypt.hash(password, 10)
    const response = await db.insert(User)
        .values({
            name: fullname,
            username: username,
            email: email,
            password: hash,
            githubId:githubId,
            authMethod: 'github',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
    if (!response) throw new Error('User not created')
    return response
}
