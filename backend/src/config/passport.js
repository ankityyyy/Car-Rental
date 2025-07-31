import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {

  try {
    const user = await User.findById(id);
    done(null, user); 
  } catch (err) {
    done(err);
  }
});


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Google profile", profile);
      try {
        const email = profile.emails?.[0]?.value;
        const name = profile.displayName;
        const providerId = profile.id;
        const profilePicture = profile.photos?.[0]?.value;


        let user = await User.findOne({ email });

        if (user) {
          if (!user.providerId) {
            user.provider = "google";
            user.providerId = providerId;
            await user.save();
          }
          return done(null, user);
        }


        const newUser = new User({
          name,
          email,
          provider: "google",
          providerId,
          profilePictureimage: {
            url: profilePicture || "",
          },
        });

        await newUser.save();
        return done(null, newUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);


passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}, async (jwt_payload, done) => {
  try {
    const user = await User.findById(jwt_payload.id);
    if (user) return done(null, user);
    return done(null, false);
  } catch (err) {
    return done(err, false);
  }
}));

export default passport;