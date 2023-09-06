import { z, ZodType } from "zod";
import { RequestHandler } from "express";

type Schema = Record<string, ZodType>;

function validate(schema: Schema): RequestHandler {
    return (req, res, next) => {
        if (!req.body) {
            res.status(400).json({
                message: "No request body",
            });
        }
        const result = z.object(schema).safeParse(req.body);

        if (result.success === false) {
            res.status(400).json({
                message: "Invalid request body",
                errors: result.error,
            });
            return;
        }

        req.body = result.data;
        next();
    };
}

export default validate;
