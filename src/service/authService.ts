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

    public verifyToken(token: string): number|null {
        try {
            const decoded = jwt.verify(token, this.appKey) as {id: number};

            return decoded.id;
        } catch (e) {
            return null;
        }
    }
}
