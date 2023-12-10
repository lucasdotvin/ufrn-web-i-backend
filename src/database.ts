import {Connection, createConnection} from "mysql2";

export const newDatabase = (uri: string): Connection => {
    const database = createConnection(uri);

    database.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL
        )
    `);

    database.query(`
        CREATE TABLE IF NOT EXISTS medicines (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            user_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            periodicity INTEGER NOT NULL,
            units INTEGER NOT NULL,
            started_at TIMESTAMP
        )
    `);

    return database;
}
