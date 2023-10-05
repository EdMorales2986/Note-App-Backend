import { Request, Response, Router } from "express";
import passport from "passport";

// this is leftover from the tutorial and for random testing purposes
const router = Router();

router.get(
  "/private",
  passport.authenticate("jwt", { session: false }),
  function (req: Request, res: Response) {
    res.send("success");
  }
);

export default router;
