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

        database.run(`
            CREATE TABLE IF NOT EXISTS medicines (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                periodicity INTEGER NOT NULL,
                units INTEGER NOT NULL,
                started_at TIMESTAMP,
                
                FOREIGN KEY(user_id) REFERENCES users(id)
            )
        `);
    });

    return database;
}
