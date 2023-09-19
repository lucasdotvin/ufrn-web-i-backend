import {Request, Response} from "express";

export abstract class Controller {
    protected handleError(request: Request, response: Response, error: unknown) {
        if (error instanceof Error) {
            response.json({ error: error.message });
            return;
        }

        response.json({ error: 'Unknown error' });
    }
}
