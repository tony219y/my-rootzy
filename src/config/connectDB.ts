import 'dotenv/config';
import {drizzle} from 'drizzle-orm/node-postgres';

// Connect to the database
export const db = drizzle(process.env.DATABASE_URL!);

