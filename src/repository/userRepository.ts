import { User } from "../entities/user";
import { Repository } from "./repository";

export class UserRepository extends Repository {
    public async find(id: number): Promise<User|undefined> {
        const userData = await this.findWhere(
            "SELECT * FROM users WHERE id = ? LIMIT 1",
            [id],
        );

        if (!userData) {
            return undefined;
        }

        return this.mapToUser(userData);
    }

    public async findByEmail(email: string): Promise<User|undefined> {
        const userData = await this.findWhere(
            "SELECT * FROM users WHERE email = ? LIMIT 1",
            [email],
        );

        if (!userData) {
            return undefined;
        }

        return this.mapToUser(userData);
    }

    public async store(name: string, email: string, password: string): Promise<number> {
        return this.insert(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, password],
        );
    }

    private mapToUser(row: any): User {
        return new User(
            row.id,
            row.name,
            row.email,
            row.password,
        );
    }
}
