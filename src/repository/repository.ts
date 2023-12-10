import {Database} from "sqlite3";
import {Connection} from "mysql2";

export abstract class Repository {
    private connection: Connection;

    public constructor(connection: Connection) {
        this.connection = connection;
    }

    protected findWhere(query: string, parameters: Array<string|number>): Promise<unknown> {
        return new Promise((resolve, reject) => {
            this.connection.query(
                query,
                parameters,
                (err, row) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    const result = row as any;

                    resolve(result[0]);
                }
            );
        });
    }

    protected getAllWhere(query: string, parameters: Array<string|number>): Promise<Array<unknown>> {
        return new Promise((resolve, reject) => {
            this.connection.query(
                query,
                parameters,
                (err, rows) => err ? reject(err) : resolve(rows as any)
            );
        });
    }

    protected insert(query: string, parameters: Array<string|number|Date>): Promise<number> {
        return new Promise((resolve, reject) => {
            this.connection.query(
                query,
                parameters,
                (err, row) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    const result = row as any;

                    resolve(result.insertId);
                }
            );
        });
    }
}
