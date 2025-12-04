import { Router, type Router as RouterType } from "express";
import { login, register } from "./controllers/auth.controller.ts";

const router: RouterType = Router();

// GET
router.get("/books", (req, res) => res.send("boooookks"));

// POST
router.post("/login", login);
router.post("/register", register);

export default router;
