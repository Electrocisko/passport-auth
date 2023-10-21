import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import connection from "./database/connection.js";
import viewsRouter from './routes/viewRoutes.js';
import usersRouter from './routes/userRoutes.js';
import initPassportLocal from "./config/configPassport.js";
import passport from "passport";
import session from 'express-session';
import config from "./config/configEnv.js";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import {MONGO_URI, SECRET} from './database/connection.js'


const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = config.app.PORT || 3000;

//Conected to database
connection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(session({secret: SECRET, resave: true, saveUninitialized:true })); //MemoyStore

// app.use(session({
//   secret: SECRET,
//   store: MongoStore.create({
//       mongoUrl:MONGO_URI,
//       ttl:3600
//   }),
//   resave:false,
//   saveUninitialized: false
// }))

initPassportLocal();
app.use(passport.initialize());
app.use(passport.session());


//Routes
app.use('/',viewsRouter);
app.use('/',usersRouter);

////////////////////////////////////////////////////////////////////

// app.get('/auth/google',
//   passport.authenticate('google', { scope:
//       [ 'email', 'profile' ] }
// ));

// app.get( '/googlecallback',
//     passport.authenticate( 'google', {
//         successRedirect: '/auth/google/success',
//         failureRedirect: '/auth/google/failure'
// }));


// app.get('/auth/google/success', (req,res)=> {
//   console.log(req.user);
//   res.send('google success')
// })

// app.get('/auth/google/failure', (req,res)=> {
//   res.send('google Faill :/')
// })




////////////////////////////////////////////////////////////////


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
