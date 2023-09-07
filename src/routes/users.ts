import { Router } from "express";
import { jwt } from "./middleware/jwt";
import { getUsers } from "./handlers/users/getUsers";
import { getUser } from "./handlers/users/getUser";

const router = Router();

router.get("/", jwt, getUsers);
router.get("/:id", jwt, getUser);

export const UserRouter = router;
