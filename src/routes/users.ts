import { Router } from "express";
const router = Router();

router.get("/", async function (req, res, _next) {
    res.send("respond with a resource");
});

router.get("/:id", async function (req, res, _next) {
    const { id } = req.params;
    res.send(`respond with a resource ${id}`);
});

export const UserRouter = router;
