import { Request, Response, Router } from "express";
import {
  createNote,
  deleteNote,
  updateNote,
} from "../controllers/notes.controllers";
import passport from "passport";

const router = Router();

router.post(
  "/signin/:user/notes/create",
  //passport.authenticate("jwt", { session: false }),
  createNote
);

router.post("/signin/:user/notes/update/:id", updateNote);
router.post("/signin/:user/notes/delete/:id", deleteNote);

export default router;
