// config/passportGoogle.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/userModel.js";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        let user = await User.findOne({ email });

        if (user) {
          // ✅ If found, log them in.
          return done(null, user);
        }

        // ✅ If not found, create new
        user = await User.create({
          firstName: profile.name.givenName || "N/A",
          lastName: profile.name.familyName || "N/A",
          email: email,
          password: "google-oauth",
          gender: "N/A",
          image: [profile.photos[0].value],
          verified: true,
          role: "user",
        });

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);


// ✅ Session serialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
