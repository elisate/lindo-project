import passport from "../config/passportGoogle.js";

export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});
// refined Google Authentication
export const googleAuthCallback = (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!user) {
      return res.status(401).json({ error: "Login failed" });
    }

    req.login(user, (loginErr) => {
      if (loginErr) {
        return res.status(500).json({ error: "Login error" });
      }

      // ✅ Return user data as JSON
      return res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        gender: user.gender,
        role: user.role,
        image: user.image,
        verified: user.verified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        __v: user.__v
      });
    });
  })(req, res, next);
};
// fixing Out puts

export const logout = (req, res) => {
  req.logout(() => {
    res.redirect(process.env.FRONTEND_URL);
  });
};
