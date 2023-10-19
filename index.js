import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import connection from "./database/connection.js";
import viewsRouter from './routes/viewRoutes.js';
import usersRouter from './routes/userRoutes.js';
import initPassportLocal from "./config/configPassport.js";
import passport from "passport";

import session from 'express-session';
const __dirname = dirname(fileURLToPath(import.meta.url));
import config from "./config/configEnv.js";

const app = express();
const PORT = config.app.PORT || 3000;
const SECRET = config.session.SECRET;

//Conected to database
connection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(session({secret: SECRET, resave: true, saveUninitialized:true }));

initPassportLocal();
app.use(passport.initialize());
app.use(passport.session());


//Routes
app.use('/',viewsRouter);
app.use('/',usersRouter);

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
