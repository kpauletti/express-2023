import { Router } from "express";
import { User } from "../db/models/user";
import bcrypt from "bcrypt";
import { z } from "zod";
const router = Router();
import validate from "./middleware/validate";

const signupSchema = {
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
};

router.post("/signup", validate(signupSchema), async function (req, res, next) {
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
        });
        res.json(user);
    } catch (error) {
        res.status(400).json({
            message: "Invalid request body",
            errors: error.errors,
        });
    }
});

const loginSchema = {
    email: z.string().email(),
    password: z.string().min(8),
};

router.post("/login", validate(loginSchema), async function (req, res, next) {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (!user) {
            res.status(401).json({
                message: "Invalid credentials",
            });
            return;
        }
        const passwordMatch = bcrypt.compareSync(req.body.password, user.passwordHash);
        if (!passwordMatch) {
            res.status(401).json({
                message: "Invalid credentials",
            });
            return;
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({
            message: "Invalid request body",
            errors: error.errors,
        });
    }
});

export const AuthRouter = router;
