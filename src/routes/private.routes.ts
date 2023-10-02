import { Request, Response, Router } from "express";
import passport from "passport";

const router = Router();

router.get(
  "/private",
  passport.authenticate("jwt", { session: false }),
  function (req: Request, res: Response) {
    res.send("success");
  }
);

export default router;
