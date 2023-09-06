import { RequestHandler } from "express";

export const jwt: RequestHandler = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).json({
            message: "No authorization header sent",
        });
        return;
    }

    const [, token] = req.headers.authorization.split(" ");
};
