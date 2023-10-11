import { NextFunction, Request, Response, Router } from "express";
import {
  signIn,
  signUp,
  deleteUser,
  updateInfo,
} from "../controllers/users.controllers";
import { displayNote } from "../controllers/notes.controllers";
import passport from "passport";

const router = Router();
//Not Used, More Problems Than Solutions: passport.authenticate("jwt", { session: false }),

router.post(
  "/jwt-verify",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ state: true });
  }
);

router.post("/signup", signUp);
router.post("/signin", signIn);

// Routes for after you login in the app
router.get("/signin/:user", displayNote);

router.post("/signin/:user/delete", deleteUser);

router.post("/signin/:user/update", updateInfo);

export default router;
