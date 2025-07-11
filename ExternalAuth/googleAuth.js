// controllers/googleAuth.js
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
      // ✅ If user is false, show the reason
      return res.redirect("/login?error=" + encodeURIComponent(info?.message || "Login failed"));
    }

    // ✅ If user found or created, log them in
    req.login(user, (loginErr) => {
      if (loginErr) {
        return res.status(500).send("Login error");
      }
      return res.redirect("/");
    });
  })(req, res, next);
};

export const logout = (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
};
