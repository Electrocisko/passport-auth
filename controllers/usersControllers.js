import { User } from "../models/userModel.js";
import { createHash, isValidPassword } from "../helpers/cryptPassword.js";

const userLogin = async (req, res) => {
  try {
    return res.json({
      status: "success",
      data: req.user
    })
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
    const payload = req.body;
    const user = req.user;
    return res.json({
      status: "success",
      message: "Aca va el registro",
      payload,
      user
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
