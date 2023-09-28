import { Request, Response } from "express";
import users, { IUser } from "../models/users";
import jwt from "jsonwebtoken";

function createToken(user: IUser) {
  return jwt.sign(
    { id: user.id, email: user.email },
    `${process.env.JWTSECRET}`,
    { expiresIn: 864000 }
  );
}

//SECTION - Auth Route Functionality
//ANCHOR - Sign Up functions
export const signUp = async function (
  req: Request,
  res: Response
): Promise<Response> {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ msg: "Please send your email and password" });
  }
  const user = await users.findOne({ email: req.body.email });
  if (user) {
    return res.sendStatus(400).json({ msg: "The user already exists" });
  }
  const newUser = new users(req.body);
  await newUser.save();

  return res.status(200).json(newUser);
};

//ANCHOR - Sign In functions
export const signIn = async function (req: Request, res: Response) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ msg: "Please send your email and password" });
  }

  const user = await users.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }

  const isMatch = await user.comparePassword(req.body.password);
  if (isMatch) {
    return res.status(200).json({ token: createToken(user) });
  }

  return res
    .status(400)
    .json({ msg: "Either the password or the email are wrong, check again" });
};
//!SECTION
