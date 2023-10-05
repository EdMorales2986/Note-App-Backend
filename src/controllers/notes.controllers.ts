import { Request, Response, NextFunction } from "express";
import notes from "../models/notes";
import users from "../models/users";

export const displayNote = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  // const notesUser = await notes.aggregate([{ $sort: { updatedAt : -1 } }]);
  // const notesUser = await notes.aggregate([{ $sort: { createdAt : -1 } }]);
  const notesUser = await notes.aggregate([{ $sort: { col: -1 } }]);
  res.json(notesUser);
  next();
};

export const createNote = async function (
  req: Request,
  res: Response
): Promise<Response> {
  if (!req.body.title || !req.body.content || !req.body.owner) {
    return res.status(400).json({ msg: "Please send valid data" });
  }
  if (req.body.owner != req.params.user) {
    return res.status(400).json({ msg: "Dangerous Maneuver" });
  }

  const user = await users.findOne({ alias: req.params.user });
  if (user) {
    const newNote = new notes(req.body);
    await newNote.save();
    user.notes.push(newNote._id);
    await user.save();

    return res.status(200).json(newNote);
    // return res.redirect(`/signin/${req.params.user}`);
  }

  return res.status(400).json({ msg: "Something went wrong" });
};

export const updateNote = async function (req: Request, res: Response) {
  if (!req.body.title || !req.body.content || !req.body.content) {
    return res.status(400).json({ msg: "Please send valid data" });
  }

  const note = await notes.findById(req.params.id);
  if (note) {
    note.title = req.body.title;
    note.content = req.body.content;
    note.col = req.body.col;
    await note.save();

    return res.status(200).json({ msg: "note modified" });
    // return res.redirect(`/signin/${req.params.user}`);
  }

  return res.status(400).json({ msg: "Something went wrong" });
};

export const deleteNote = async function (req: Request, res: Response) {
  const note = await notes.findById(req.params.id);
  if (note) {
    await notes.deleteOne({ _id: req.params.id });
    await users.findOneAndUpdate(
      { alias: req.params.user },
      { $pull: { notes: req.params.id } }
    );
    return res.status(200).json(note);
  }

  return res
    .status(400)
    .json({ msg: "Encountered and error during this process" });
};
