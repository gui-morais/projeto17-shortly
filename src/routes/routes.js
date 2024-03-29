import express from "express";
import { signIn } from "../controllers/users/signIn.js";
import { signUp } from "../controllers/users/signUp.js";
import { validateNewUser } from "../middlewares/validateNewUser.js";
import { validateUser } from "../middlewares/validateUser.js";
import { validateAuthorization } from "../middlewares/validateAuthorization.js";
import { validateURL } from "../middlewares/validateURL.js";
import postURL from "../controllers/urls/postURL.js";
import { getURL } from "../controllers/urls/getURL.js";
import { getShortURL } from "../controllers/urls/getShortURL.js";
import { deleteURL } from "../controllers/urls/deleteURL.js";
import { getUser } from "../controllers/users/getUser.js";
import { getRanking } from "../controllers/users/getRanking.js";
import { signOut } from "../controllers/users/signOut.js";

const router = express.Router();
router.post("/signup", validateNewUser, signUp);
router.post("/signin", validateUser, signIn);
router.post("/urls/shorten", validateAuthorization, validateURL, postURL);
router.get("/urls/:id", getURL);
router.get("/urls/open/:shortUrl", getShortURL);
router.delete("/urls/:id", validateAuthorization, deleteURL);
router.get("/users/me", validateAuthorization, getUser);
router.get("/ranking", getRanking);
router.delete("/signout", validateAuthorization, signOut);

export default router;