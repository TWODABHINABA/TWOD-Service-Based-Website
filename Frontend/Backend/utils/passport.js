
const passport = require("passport");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../Models/users");

const JWT_SECRET = process.env.JWT_SECRET;
const defaultBirthday = new Date("2000-01-01");


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        // Check if a user with the same email exists with non-Google login
        let existingEmailUser = await User.findOne({ email });


        if (existingEmailUser && !existingEmailUser.googleId) {
          existingEmailUser.googleId = profile.id;
          existingEmailUser.profilePicture = profile.photos[0].value;
          await existingEmailUser.save();
          return done(null, existingEmailUser);
        }


        // Look for existing user by googleId
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // If not found by googleId but found by email (and Google login allowed), update that user
          if (existingEmailUser) {
            existingEmailUser.googleId = profile.id;
            existingEmailUser.profilePicture = profile.photos[0].value;
            await existingEmailUser.save();
            user = existingEmailUser;
          } else {
            // Otherwise create new user
            user = new User({
              name: profile.displayName,
              email,
              googleId: profile.id,
              profilePicture: profile.photos[0].value,
              birthday: defaultBirthday,
            });
            await user.save();
          }
        }

        done(null, user);

      } catch (err) {
        console.error("❌ Error during Google login:", err);
        done(err, null);
      }
    }
  )
);

// GitHub Strategy
const GitHubStrategy = require("passport-github2").Strategy;

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ['user:email'],
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails && profile.emails.length > 0
  ? profile.emails[0].value
  : null;

if (!email) {
  // Handle missing email case (reject, or use another identifier)
  return done(new Error('No email found from GitHub profile'));
}


        // Check if a user with the same email exists with non-Google login
        let existingEmailUser = await User.findOne({ email });

        if (existingEmailUser && !existingEmailUser.githubId) {
          existingEmailUser.githubId = profile.id;
          existingEmailUser.profilePicture = profile.photos[0].value;
          await existingEmailUser.save();
          return done(null, existingEmailUser);
        }

        // Look for existing user by githubId
        let user = await User.findOne({ githubId: profile.id });

        if (!user) {
          // If not found by githubId but found by email (and GitHub login allowed), update that user
          if (existingEmailUser) {
            existingEmailUser.githubId = profile.id;
            existingEmailUser.profilePicture = profile.photos[0].value;
            await existingEmailUser.save();
            user = existingEmailUser;
          } else {
            // Otherwise create new user
            const name = profile.displayName || profile.username || 'No Name';
            user = new User({
              name,
              email,
              githubId: profile.id,
              profilePicture: profile.photos[0].value,
              birthday: defaultBirthday,
            });
            await user.save();
          }
        }

        done(null, user);

      } catch (err) {
        console.error("❌ Error during GitHub login:", err);
        done(err, null);
      }
    }
  )
  );

// Store user in session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Retrieve user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});
