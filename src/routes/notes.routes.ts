import { Request, Response, Router } from "express";
import {
  createNote,
  deleteNote,
  updateNote,
} from "../controllers/notes.controllers";

const router = Router();

router.post("/signin/:user/notes/create", createNote);

router.post("/signin/:user/notes/update/:id", updateNote);
router.post("/signin/:user/notes/delete/:id", deleteNote);

export default router;
