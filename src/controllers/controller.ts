import {Request, Response} from "express";

export abstract class Controller {
    protected handleError(request: Request, response: Response, error: unknown, code: number) {
        if (error instanceof Error) {
            response.status(code).json({ error: error.message });
            return;
        }

        response.status(code).json({ error });
    }
}
