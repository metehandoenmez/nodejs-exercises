//use these only in secret files
import * as dotenv from "dotenv";
dotenv.config();

//npm install passport
//npm install passport-jwt

import passport from "passport";
import passportJWT from "passport-jwt";
import { db } from "./db.js";
//npm install -D @types/passport in case of type error
//npm install -D @types/passport-jwt

const { SECRET } = process.env;

passport.use(
  new passportJWT.Strategy(
    {
      secretOrKey: SECRET,
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      const user = await db.one(`SELECT * FROM users WHERE id=$1`, payload.id);

      try {
        return user ? done(null, user) : done(new Error("User not found."));
      } catch (error) {
        done(error);
      }
    }
  )
);
