import passport from "../config/passportGoogle.js";
import jwt from "jsonwebtoken";
// fic URL
export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

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

      // Generate JWT token with user info
      const token = jwt.sign(
        {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          image: user.image,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Redirect to frontend URL with token as query param
      const redirectUrl = `${process.env.FRONTEND_URL}/login/success?token=${token}`;

      return res.redirect(redirectUrl);
    });
  })(req, res, next);
};

export const logout = (req, res) => {
  req.logout(() => {
    res.redirect(process.env.FRONTEND_URL);
  });
};
