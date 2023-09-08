import { Router } from "express";
import * as handlers from "./handlers";

const router: Router = Router();

/* -------------------------------------------------------------------------- */
/*                                 AUTH ROUTES                                */
/* -------------------------------------------------------------------------- */

router.post("/login", handlers.login);
router.post("/signup", handlers.signup);

/* -------------------------------------------------------------------------- */
/*                                 USER ROUTES                                */
/* -------------------------------------------------------------------------- */

router.get("/users", handlers.getUsers);
router.get("/users/:id", handlers.getUser);

export const MainRouter: Router = router;
