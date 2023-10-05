import { Request, Response, NextFunction } from "express";
import notes, { INote } from "../models/notes";
import users, { IUser } from "../models/users";
import cols, { ICol } from "../models/col";

export const displayCol = async function (req: Request, res: Response) {
  const colUser = await notes.aggregate([{ $sort: { createdAt: -1 } }]);
  res.json(colUser);
};

export const createCol = async function (
  req: Request,
  res: Response
): Promise<Response> {
  if (!req.body.name) {
    return res.status(400).json({ msg: "Please send valid data" });
  }

  const newCol = new cols({ name: req.body.name, owner: req.params.user });
  await newCol.save();

  return res.status(200).json(newCol);
  // return res.redirect(`/signin/${req.params.user}`);
};

export const updateCol = async function (req: Request, res: Response) {
  if (!req.body.name) {
    return res.status(400).json({ msg: "Please send valid data" });
  }

  const col = await cols.findById(req.params.id);
  if (col) {
    let oldName = col.name;
    col.name = req.body.name;
    await notes.updateMany({ col: oldName }, { col: req.body.name });
    await col.save();

    return res.status(200).json({ msg: "Collection modified" });
    // return res.redirect(`/signin/${req.params.user}`);};
  }
  return res
    .status(400)
    .json({ msg: "Encountered and error during this process" });
};

export const deleteCol = async function (req: Request, res: Response) {
  if (!req.params.id) {
    return res.status(400).json({ msg: "Please send valid data" });
  }

  const col = await cols.findById(req.params.id);
  if (col) {
    let oldName = col.name;
    await cols.deleteOne({ _id: req.params.id });
    await notes.updateMany({ col: oldName }, { col: "" });

    return res.status(200).json({ msg: "Collection deleted" });
    // return res.redirect(`/signin/${req.params.user}`);};
  }
  return res
    .status(400)
    .json({ msg: "Encountered and error during this process" });
};
