import { UserService } from "../service/userService";
import { Request, Response } from 'express';
import { AuthService } from "../service/authService";
import {AuthenticatedRequest} from "../middleware/authMiddleware";
import { Controller } from "./controller";
import {UserResource} from "../resources/userResource";

export class UserController extends Controller{
    private userService: UserService;

    private authService: AuthService;

    constructor(userService: UserService, authService: AuthService) {
        super();

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
                user: UserResource.fromUser(user),
                token,
            });
        } catch (error: unknown) {
            this.handleError(request, response, error)
        }
    }

    public async signIn (request: Request, response: Response) {    
        const { email, password } = request.body;
    
        try {
            const user = await this.userService.signIn(email, password);
            const token = this.authService.createToken(user);
        
            response.json({
                msg: 'User signed in successfully',
                user: UserResource.fromUser(user),
                token,
            });
        } catch (error: unknown) {
            this.handleError(request, response, error)
        }
    }

    public async me (request: Request, response: Response) {
        const userId = (request as AuthenticatedRequest).userId;

        try {
            const user = await this.userService.find(userId);

            response.json({
                msg: 'User found',
                user: UserResource.fromUser(user),
            });
        } catch (error: unknown) {
            this.handleError(request, response, error)
        }
    }
}
