import { Router } from "express";
import usersControllers from "../controllers/usersControllers.js";
import passport from "passport";

const router = Router();

router.post("/login/password", passport.authenticate('login', {failureRedirect: '/error'}),usersControllers.userLogin);

router.get("/logout", usersControllers.userLogout);

router.post("/signup",passport.authenticate('register',{failureRedirect: '/error'}), usersControllers.userSignup);

router.get('/error', (req,res) => {
    return res.json({
        status: "error",
        payload: req.body
    })
})

export default router;
