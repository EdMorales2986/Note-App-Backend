import mongoose from "mongoose";
import bcrypt from "bcrypt";

//NOTE - Extending from document might not be needed anymore but i'm keeping it as close to the tutorial as possible
export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    require: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
  },
});

//ANCHOR - Register Password Encryption
userSchema.pre<IUser>("save", async function (next) {
  const user = this;
  //REVIEW - Not fully sure, it will run the rest of the code (below the condition) only if the user is a new one
  if (!user.isModified("password")) {
    return next();
  }
  //ANCHOR - Process to cipher/encrypt a password (Hashing)
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

//ANCHOR - Login Password Validator
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>("users", userSchema);
