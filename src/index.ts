import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { newDatabase } from './database';
import { UserRepository } from './repository/user';

dotenv.config();

const app = express();
const port = process.env.APP_PORT;
const database = newDatabase(process.env.DATABASE_URI ?? ':memory:');

const userRepository = new UserRepository(database);

app.get('/', (request: Request, response: Response) => {
    response.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`[!] Server running at port ${port}`);
});
