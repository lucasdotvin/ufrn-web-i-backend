import { Request, Response } from "express";
import { ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
    return async (request: Request, response: Response, next: any) => {
        await Promise.all(validations.map(validation => validation.run(request)));

        const errors = validationResult(request);
        if (errors.isEmpty()) {
            return next();
        }

        response.status(422).json({ errors: errors.array() });
    };
}
