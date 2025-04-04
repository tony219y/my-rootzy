import { integer, pgTable, varchar, boolean } from 'drizzle-orm/pg-core';

//User schema
export const User = pgTable('users',{
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    username: varchar("username", { length: 255 }).unique().notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    githubId: varchar("github_id", { length: 255 }), //Oauth added on 30/3/25
    googleId: varchar("google_id", { length: 255 }).unique(), //Oauth
    name: varchar("name", { length: 255 }).notNull(), //fullname
    avatar: varchar("avatar", { length: 255 }), //profile picture
    createdAt: varchar("created_at", { length: 255 }).notNull(),
    updatedAt: varchar("updated_at", { length: 255 }).notNull(),
    authMethod: varchar("auth_method", { length: 255 }).notNull(), //added on 30/3/25
    isactive: boolean("isactive").notNull().default(true)
});
