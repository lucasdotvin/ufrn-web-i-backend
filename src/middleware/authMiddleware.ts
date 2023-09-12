import {NextFunction, Request, Response} from "express";
import {AuthService} from "../service/authService";

export interface AuthenticatedRequest extends Request {
    userId: number;
}

export class AuthMiddleware {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    public async handle(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization;

        if (!token) {
            res.status(401).json({
                message: 'Unauthorized'
            });

            return;
        }

        const userId = await this.authService.verifyToken(token);

        if (!userId) {
            res.status(401).json({
                message: 'Unauthorized'
            });

            return;
        }

        (req as AuthenticatedRequest).userId = userId;

        next();
    }
}
