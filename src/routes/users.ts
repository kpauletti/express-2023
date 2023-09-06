import { Router } from "express";
import { User } from "../db/models/user";
const router = Router();

router.get("/", async function (req, res, next) {
    res.send("respond with a resource");
});

router.get("/:id", async function (req, res, next) {
    const { id } = req.params;
    res.send(`respond with a resource ${id}`);
});

export const UserRouter = router;
