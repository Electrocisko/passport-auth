import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  if (req.session.user) {
    let name = "User";
    if (req.session.user.username) {
      name = req.session.user.username;
    }
    if (req.session.user.displayName) {
      name = req.session.user.displayName;
    }
    return res.render("index.ejs", { username: name });
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
