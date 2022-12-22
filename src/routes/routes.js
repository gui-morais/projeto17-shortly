import express from "express";
import { signIn } from "../controllers/signIn.js";
import { signUp } from "../controllers/signUp.js";
import { validateNewUser } from "../middlewares/validateNewUser.js";
import { validateUser } from "../middlewares/validateUser.js";

const router = express.Router();
router.post("/signup", validateNewUser, signUp);
router.post("/signin", validateUser, signIn);

export default router;