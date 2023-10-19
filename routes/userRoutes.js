import { Router } from "express";
import usersControllers from "../controllers/usersControllers.js";
import passport from "passport";

const router = Router();

router.post("/login/password", passport.authenticate('login', {failureRedirect: '/error', failureMessage: true} ),usersControllers.userLogin);

router.get("/logout", usersControllers.userLogout);

router.post("/signup",passport.authenticate('register',{failureRedirect: '/error', failureMessage: true}), usersControllers.userSignup);

router.get('/error', (req,res) => {
        console.log( req.session.messages)
    return res.render('error.ejs',{messages: req.session.messages })
})

export default router;