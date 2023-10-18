import { User } from "../models/userModel.js";
import {createHash, isValidPassword} from '../helpers/cryptPassword.js';

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userDB = await User.findOne({ username });
    if (!userDB) return res.redirect("/");
    const valid = await isValidPassword(userDB.password,password);
    if (valid) {
      req.session.user = username;
      return res.redirect("/");
    }
    return res.redirect("/");
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

const userLogout = (req, res) => {
  req.session.destroy((error) => {
    if (error)
      return res.json({
        status: "error",
        message: "Logout Error",
      });
    return res.redirect("/");
  });
};

const userSignup = async (req, res) => {
  try {
    let newUser = new User(req.body);
    newUser.password = await createHash(req.body.password);
    const user = await newUser.save();
    return res.json({
      status: "success",
      message: "Aca va el registro",
      user,
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

export default {
  userLogin,
  userLogout,
  userSignup,
};
