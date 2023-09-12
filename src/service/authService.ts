import jwt from 'jsonwebtoken';
import { User } from '../entities/user';

export class AuthService {
    private appKey: string;

    private authTokenDurationSeconds: number;

    constructor(appKey: string, authTokenDurationSeconds: number) {
        this.appKey = appKey;
        this.authTokenDurationSeconds = authTokenDurationSeconds;
    }

    public createToken(user: User): string {
        const token = jwt.sign({id: user.id}, this.appKey, {
            expiresIn: this.authTokenDurationSeconds
        });

        return token;
    }

    public verifyToken(token: string): string|null {
        const decoded = jwt.verify(token, this.appKey);

        console.log(decoded);

        return decoded as string;
    }
}
