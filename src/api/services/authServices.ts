import { User } from '../models/schema'
import { eq } from 'drizzle-orm'
import { db } from '../../config/connectDB'
import { generateToken } from '../helper/jwtHelper'
import bcrypt from 'bcrypt'
import e from 'express'

//check if user exists or not in the database
export const login = async (email: string, password: string) => {

    const user = await db.select().from(User).where(eq(User.email, email))
    if (!user) throw new Error('User not found')

    const chectPassword = await bcrypt.compare(password, user[0].password)
    if (!chectPassword) throw new Error('Invalid password')

    return generateToken(user[0].id.toString());

}

//register a new user
export const register = async (name:string, username:string , email: string, password: string) => {
    const hash = await bcrypt.hash(password, 10)
    const response = await db.insert(User)
        .values({
            name: name,
            username: username,
            email: email,
            password: hash,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
    if (!response) throw new Error('User not created')
    return response
}