import { Router, type Router as RouterType } from "express";
import { login, register } from "./controllers/auth.controller.ts";
import { authMiddleware } from "./middlewares/auth.middleware.ts";
import { courses } from "./controllers/course.controller.ts";

const router: RouterType = Router();

// GET
router.get("/home", (req, res) => res.send("home page."));
router.get("/courses",courses);
 
// POST
router.post("/login", login);
router.post("/register", register);

export default router;
