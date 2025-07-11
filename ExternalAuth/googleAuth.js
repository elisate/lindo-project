// controllers/googleAuth.js
import passport from "../config/passportGoogle.js";

export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleAuthCallback = passport.authenticate("google", {
  failureRedirect: "/login",
  successRedirect: "/", // Redirect where you want after success
});

export const logout = (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
};
