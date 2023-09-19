import {Database} from "sqlite3";

export abstract class Repository {
    private database: Database;

    public constructor(database: Database) {
        this.database = database;
    }

    protected findWhere(query: string, parameters: Array<string|number>): Promise<unknown> {
        return new Promise((resolve, reject) => {
            this.database.get(
                query,
                parameters,
                (err, row) => err ? reject(err) : resolve(row)
            );
        });
    }

    protected getAllWhere(query: string, parameters: Array<string|number>): Promise<Array<unknown>> {
        return new Promise((resolve, reject) => {
            this.database.all(
                query,
                parameters,
                (err, rows) => err ? reject(err) : resolve(rows)
            );
        });
    }

    protected insert(query: string, parameters: Array<string|number|Date>): Promise<number> {
        return new Promise((resolve, reject) => {
            this.database.run(
                query,
                parameters,
                function(err) {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(this.lastID);
                }
            );
        });
    }
}
