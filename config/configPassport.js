import passport from "passport";
import local from "passport-local";
import { User } from "../models/userModel.js";
import { createHash, isValidPassword } from "../helpers/cryptPassword.js";

const LocalStrategy = local.Strategy;

const initPassportLocal = () => {
try {
    passport.use(
        "register",
        new LocalStrategy(
          { passReqToCallback: true },
          async (req, username, password, done) => {
            //Faltan validaciones de que lleguen los datos
            const userData = {
              username,
              password,
            };
            const exist = await User.findOne({ username });
            if (exist)
              return done(null, false, { message: "usuario ya registrado" });
            let newUser = new User(userData);
            newUser.password = await createHash(req.body.password);
            const user = await newUser.save();
            if (!user)
              return done(null, false, { message: "Error al crear usuario" });
            return done(null, user);
          }
        )
      );
} catch (error) {
    return done(error, false)
}

  passport.use(
    "login",
    new LocalStrategy(
    async (username, password, done) => {
      const userDB = await User.findOne({ username });
      if (!userDB) return done(null,false, {message: "No existe usuario"});
      const valid = await isValidPassword(userDB.password, password);
      if (valid) {
        return done(null, userDB)
      }
      return done(null,false, {message: "error en validacion de usuario"})
    })
  );


  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let result = await User.findById(id);
    return done(null, result);
  });
};

export default initPassportLocal;
