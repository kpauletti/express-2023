import { Router } from "express";
import { UserRouter } from "./users";
import { AuthRouter } from "./auth";

const router: Router = Router();

router.use("/users", UserRouter);
router.use("/", AuthRouter);

export const MainRouter: Router = router;
