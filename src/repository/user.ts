import { Database } from "sqlite3";
import { User } from "../entities/user";

export class UserRepository {
    private database: Database;
    
    constructor(database: Database) {
        this.database = database;
    }
    
    public async find(id: number): Promise<User> {
        return new Promise((resolve, reject) => {
            this.database.get<User>(
                "SELECT * FROM users WHERE id = ? LIMIT 1",
                [id],
                (err, row) => err ? reject(err) : resolve(row)
            );
        });
    }

    public async findByEmail(email: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.database.get<User>(
                "SELECT * FROM users WHERE email = ? LIMIT 1",
                [email],
                (err, row) => err ? reject(err) : resolve(row)
            );
        });
    }

    public async create(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            this.database.run(
                "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
                [user.name, user.email, user.password],
                function(err) {
                    if (err) {
                        reject(err);
                        return;
                    }

                    user.id = this.lastID;
                    resolve(user);
                }
            );
        });
    }
}
