import { Router } from "express";

const router = Router();

import { signup } from "./handlers/signup";
import { login } from "./handlers/login";

router.post("/signup", signup);
router.post("/login", login);

export const AuthRouter = router;
