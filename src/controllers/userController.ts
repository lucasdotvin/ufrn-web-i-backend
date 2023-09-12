import { UserService } from "../service/userService";
import { Request, Response } from 'express';
import { AuthService } from "../service/authService";

export class UserController {
    private userService: UserService;

    private authService: AuthService;

    constructor(userService: UserService, authService: AuthService) {
        this.userService = userService;
        this.authService = authService;
    }

    public async signUp (request: Request, response: Response) {    
        const { name, email, password } = request.body;
    
        try {
            const user = await this.userService.signUp(name, email, password);
            const token = this.authService.createToken(user);
        
            response.json({
                msg: 'User created successfully',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                token,
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                response.json({ error: error.message });
                return;
            }

            response.json({ error: 'Unknown error' });
        }
    }

    public async signIn (request: Request, response: Response) {    
        const { email, password } = request.body;
    
        try {
            const user = await this.userService.signIn(email, password);
            const token = this.authService.createToken(user);
        
            response.json({
                msg: 'User signed in successfully',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                token,
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                response.json({ error: error.message });
                return;
            }

            response.json({ error: 'Unknown error' });
        }
    }
}
