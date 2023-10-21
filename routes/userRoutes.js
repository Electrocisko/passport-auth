import { Router } from "express";
import usersControllers from "../controllers/usersControllers.js";
import passport from "passport";

const router = Router();

router.post("/login/password", passport.authenticate('login', {failureRedirect: '/error', failureMessage: true} ),usersControllers.userLogin);

router.get("/logout", usersControllers.userLogout);

router.post("/signup",passport.authenticate('register',{failureRedirect: '/error', failureMessage: true}), usersControllers.userSignup);

router.get('/github', passport.authenticate('github', {scope:['user:email']}),async (req,res) => {console.log('llegue aca')});

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/error', failureMessage: true}), usersControllers.userLogin);

router.get('/auth/google',passport.authenticate('google', { scope:[ 'email', 'profile' ]}));

router.get( '/googlecallback',passport.authenticate( 'google', {failureRedirect: '/auth/google/failure'}),usersControllers.userLogin);

// router.get('/auth/google/success', (req,res)=> {
//     console.log(req.user);
//     res.send('google success')
//   })
  
  router.get('/auth/google/failure', (req,res)=> {
    res.send('google Faill :/')
  })

router.get('/error', (req,res) => {
        console.log( req.session.messages)
    return res.render('error.ejs',{messages: req.session.messages })
})



export default router;