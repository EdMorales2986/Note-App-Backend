import { Router } from "express";
import passport from "passport";

const router = Router();

router.get(
  "/private",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    res.send("success");
  }
);

export default router;
