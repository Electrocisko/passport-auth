import passport from "passport";
import local from "passport-local";
import { User } from "../models/userModel.js";
import { createHash, isValidPassword } from "../helpers/cryptPassword.js";
import GitHubStrategy from "passport-github2";
import passportGoogleAuth2 from "passport-google-oauth2";
import configEnv from "./configEnv.js";

const LocalStrategy = local.Strategy;
const GoogleStrategy = passportGoogleAuth2.Strategy;

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
    return done(error, false);
  }

  passport.use(
    "login",
    new LocalStrategy(async (username, password, done) => {
      const userDB = await User.findOne({ username });
      if (!userDB) return done(null, false, { message: "No existe usuario" });
      const valid = await isValidPassword(userDB.password, password);
      if (valid) {
        return done(null, userDB);
      }
      return done(null, false, { message: "error en validacion de usuario" });
    })
  );

  passport.use(
    new GitHubStrategy(
      {
        clientID: configEnv.github.GITHUB_CLIENT_ID,
        clientSecret: configEnv.github.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3030/githubcallback",
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          let user = await User.findOne({ username: profile._json.name });
          if (!user) {
            let randomPass = Date.now();
            let stringPass = randomPass.toString();
            let password = await createHash(stringPass);
            const newUser = {
              username: profile._json.name,
              password,
            };
            user = await User.create(newUser);
          }

          return done(null, user);
        } catch (error) {
          return done(err, false);
        }
      }
    )
  );
  /////////////////GOOGLE /////////////////////////////////
  passport.use(
    new GoogleStrategy(
      {
        clientID: configEnv.google.GOOGLE_CLIENT_ID,
        clientSecret: configEnv.google.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3030/googlecallback",
        passReqToCallback: true,
      },
      async function (request, accessToken, refreshToken, profile, done) {
        // Aca va toda la logica de ver si ya esta registrado o si lo tengo que registrar
        let user = await User.findOne({ username: profile.displayName });
        if (!user) {
          let randomPass = Date.now();
          let stringPass = randomPass.toString();
          let password = await createHash(stringPass);
          const newUser = {
            username: profile.displayName,
            password,
          };
          user = await User.create(newUser);
        }
        return done(null, user);
      }
    )
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
