import passport from "../config/passportGoogle.js";

export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleAuthCallback = (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      return res.status(500).send("Error: " + err.message);
    }

    if (!user) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=Login Failed`);
    }

    req.login(user, (loginErr) => {
      if (loginErr) {
        return res.status(500).send("Login error");
      }

      // ✅ Redirect to frontend with user ID
      return res.redirect(`${process.env.FRONTEND_URL}?user=${user._id}`);
    });
  })(req, res, next);
};

export const logout = (req, res) => {
  req.logout(() => {
    res.redirect(process.env.FRONTEND_URL);
  });
};
