import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import users from "../models/users";

//SECTION - Passport Middleware
const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWTSECRET,
};

export default new Strategy(opts, async function (payload, done) {
  try {
    const user = await users.findById(payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    console.log(error);
  }
});
//!SECTION