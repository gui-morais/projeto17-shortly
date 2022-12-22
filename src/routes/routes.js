import express from "express";
import { postUser } from "../controllers/postUser.js";
import { validateNewUser } from "../middlewares/validateNewUser.js";

const router = express.Router();
router.post("/signup", validateNewUser, postUser);

export default router;