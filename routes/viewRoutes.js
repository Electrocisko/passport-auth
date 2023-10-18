import {Router} from 'express';


const router = Router();

router.get("/", (req, res) => {
    if (req.session.user) {
      return res.render('index.ejs',{username:req.session.user })
    }
    return res.render("home.ejs");
  });

 router.get("/login", (req, res) => {
    return res.render("login.ejs");
  });

  router.get("/signup", (req, res) => {
    return res.render("signup.ejs");
  });

  export default router;