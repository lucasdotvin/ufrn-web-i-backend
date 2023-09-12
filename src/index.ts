import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import dotenv from 'dotenv';
import { newDatabase } from './database';
import { UserRepository } from './repository/userRepository';
import { UserService } from './service/userService';
import { UserController } from './controllers/userController';
import { validate } from './validation';
import { AuthService } from './service/authService';
import {AuthMiddleware} from "./middleware/authMiddleware";

dotenv.config();

const app = express();
const port = process.env.APP_PORT;
const database = newDatabase(process.env.DATABASE_URI ?? ':memory:');

const userRepository = new UserRepository(database);

const userService = new UserService(userRepository);
const authService = new AuthService(process.env.APP_KEY ?? '', parseInt(process.env.AUTH_TOKEN_DURATION_SECONDS ?? '86400'));

const authMiddleware = new AuthMiddleware(authService);

const userController = new UserController(userService, authService);

app.use(express.json());

app.get('/', (request: Request, response: Response) => {
    response.send('Hello, World!');
});

app.post('/sign-up', validate([
    body('name').isString().isLength({ min: 3 }),
    body('email').isEmail().custom(async (email: string) => {
        const isEmailAlreadyInUse = await userService.checkIfEmailIsAlreadyInUse(email);

        if (isEmailAlreadyInUse) {
            throw new Error('Email is already in use');
        }
    }),
    body('password').isString().isLength({ min: 8 })
]), userController.signUp.bind(userController));

app.post('/sign-in', validate([
    body('email').isEmail(),
    body('password').isString().isLength({ min: 8 })
]), userController.signIn.bind(userController));

app.get('/me', authMiddleware.handle.bind(authMiddleware), userController.me.bind(userController));

app.listen(port, () => {
    console.log(`[!] Server running at port ${port}`);
});
