import { Request, Response, NextFunction } from "express";
import passport from "passport";
//this middleware function can access the next function with NextFuncton

//session is old alternative way of token auth

const authorize = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err: any, user: any) => {
    if (!user || err) {
      res.status(401).json({ msg: "Unauthorized" });
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
};

export default authorize;
