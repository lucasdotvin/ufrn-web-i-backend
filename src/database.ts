import { Database } from "sqlite3";

export const newDatabase = (uri: string): Database => {
    const database = new Database(uri);

    database.serialize(() => {
        database.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                password TEXT NOT NULL
            )
        `);
    });

    return database;
}
