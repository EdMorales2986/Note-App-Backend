import { Request, Response, NextFunction } from "express";
import users, { IUser } from "../models/users";
import notes from "../models/notes";
import jwt from "jsonwebtoken";

function createToken(user: IUser) {
  return jwt.sign(
    { id: user.id, alias: user.alias },
    `${process.env.JWTSECRET}`,
    { expiresIn: 600 }
  );
}

// Auth Route Functionality

// Sign Up functions
// Specifying that it will return a promise of type 'Response' is not obligatory
// export const signUp = async function (req: Request,res: Response) { <-- this will work
export const signUp = async function (
  req: Request,
  res: Response
): Promise<Response> {
  if (
    !req.body.alias ||
    !req.body.password ||
    !req.body.email ||
    !req.body.name ||
    !req.body.lname
  ) {
    return res.status(400).json({ msg: "Please send valid data" });
  }

  const userAlias = await users.findOne({ alias: req.body.alias });
  const userEmail = await users.findOne({ email: req.body.email });
  if (userAlias || userEmail) {
    return res.status(400).json({ msg: "The user already exists" });
  }

  // We create an instance of the model 'users' which makes it a 'document' and documents are entries stored inside a collection
  const newUser = new users(req.body);
  // .save() Saves this document 'newUser' by inserting a new document into the database
  await newUser.save();

  return res.status(200).json(newUser);
  // return res.redirect(`/signin}`);
};

// Sign In functions
export const signIn = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body.alias || !req.body.password) {
    return res.status(400).json({ msg: "Please send your alias and password" });
  }

  const user = await users.findOne({ alias: req.body.alias });
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }

  const isMatch = await user.comparePassword(req.body.password);
  if (isMatch) {
    // const token = createToken(user);
    return res.redirect(`/signin/${req.body.alias}`);
  }

  return res
    .status(400)
    .json({ msg: "Either the password or the alias are wrong, check again" });
};

export const deleteUser = async function (req: Request, res: Response) {
  if (!req.body.alias || !req.body.password) {
    return res.status(400).json({ msg: "Please send valid data" });
  }

  const user = await users.findOne({ alias: req.params.user });
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }

  const isMatch = await user.comparePassword(req.body.password);
  if (user && isMatch) {
    await users.deleteOne({ alias: req.params.user });
    await notes.deleteMany({ owner: req.params.User });

    return res.status(200).json({ msg: "user deleted" });
    // return res.redirect(`/signin`);
  }

  return res
    .status(400)
    .json({ msg: "Encountered and error during this process" });
};

export const updateInfo = async function (req: Request, res: Response) {
  if (
    !req.body.oldPass ||
    !req.body.newPass ||
    !req.body.email ||
    !req.body.name ||
    !req.body.lname
  ) {
    return res.status(400).json({ msg: "Please send valid data" });
  }

  const user = await users.findOne({ alias: req.params.user });
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }

  const isMatch = await user.comparePassword(req.body.oldPass);
  if (user && isMatch) {
    user.name = req.body.name;
    user.lname = req.body.lname;
    user.email = req.body.email;
    user.password = req.body.newPass;
    await user.save();
    return res.redirect(`/signin/${req.params.user}`);
  }

  // {
  //   "name": "Alonso",
  //   "lname": "Rondon",
  //   "email": "AlRo@gmail.com",
  //   "oldAlias": "Ed_123",
  //   "newAlias": "Al777",
  //   "oldPass": "Wo_Xing_Shi",
  //   "newPass": "bruh"
  // }

  return res
    .status(400)
    .json({ msg: "Encountered and error during this process" });
};
