import { Router } from "express";
import usersControllers from "../controllers/usersControllers.js";

const router = Router();

router.post("/login/password", usersControllers.userLogin);

router.get("/logout", usersControllers.userLogout);

router.post("/signup", usersControllers.userSignup);

export default router;
