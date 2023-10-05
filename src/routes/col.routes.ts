import { Request, Response, Router } from "express";
import {
  createCol,
  deleteCol,
  updateCol,
} from "../controllers/col.controllers";
import passport from "passport";

const router = Router();

router.post(
  "/signin/:user/cols/create",
  //passport.authenticate("jwt", { session: false }),
  createCol
);

router.post("/signin/:user/cols/update/:id", updateCol);
router.post("/signin/:user/cols/delete/:id", deleteCol);

export default router;
