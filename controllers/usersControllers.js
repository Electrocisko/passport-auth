

const userLogin = async (req, res) => {
  try {
      req.session.user = req.user;
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
    const user = req.user;
    return res.render('home.ejs');
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
