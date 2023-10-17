import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import connection from "./database/connection.js";
//Para passport
import session from 'express-session';
import passport from "passport";
import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 8000;

//Conected to database
connection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));






app.get("/", (req, res) => {
  return res.render("home.ejs");
});

app.get("/login", (req, res) => {
  return res.render("login.ejs");
});

app.get("/signup", (req, res) => {
  return res.render("signup.ejs");
});

app.get("/error", (req, res) => {
    // Esto esta de prueba para ver como renderiza la pagina el error
    const error = {
        status: 500
    }
    return res.render("error.ejs",{message:"mensaje",error });
  });


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
