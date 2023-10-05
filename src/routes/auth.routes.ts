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

// Routes for before you login in the app
router.get("/signup", function (req: Request, res: Response) {
  res.send("signup");
});
router.post("/signup", signUp);

router.get("/signin", function (req: Request, res: Response) {
  res.send("signin");
});

router.post("/signin", signIn);

// Routes for after you login in the app
router.get(
  "/signin/:user",
  // passport.authenticate("jwt", { session: false }),
  displayNote
);

router.post(
  "/signin/:user/delete",
  // passport.authenticate("jwt", { session: false }),
  deleteUser
);

router.post(
  "/signin/:user/update",
  // passport.authenticate("jwt", { session: false }),
  updateInfo
);

export default router;
