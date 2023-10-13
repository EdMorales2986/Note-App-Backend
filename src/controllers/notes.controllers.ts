import { Request, Response, NextFunction } from "express";
import notes, { INote } from "../models/notes";
import users, { IUser } from "../models/users";
import cols, { ICol } from "../models/col";

export const displayNote = async function (req: Request, res: Response) {
  const notesUser = await notes.aggregate([
    { $sort: { col: -1 } },
    { $match: { owner: req.params.user } },
  ]);
  res.json(notesUser);
};

export const createNote = async function (
  req: Request,
  res: Response
): Promise<Response> {
  if (!req.body.title || !req.body.content) {
    return res.status(400).json({ msg: "Please send valid data" });
  }

  const col = await cols.findOne({
    name: req.body.col,
    owner: req.params.user,
  });
  if (!col) {
    return res.status(400).json({ msg: "Collection doesn't exist" });
  }
  const user = await users.findOne({ alias: req.params.user });
  if (user) {
    const newNote = new notes({
      title: req.body.title,
      content: req.body.content,
      owner: req.params.user,
      col: req.body.col,
    });
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
  const col = await cols.findOne({
    name: req.body.col,
    owner: req.params.user,
  });
  if (!col) {
    return res.status(400).json({ msg: "Collection doesn't exist" });
  }
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
