import mongoose from "mongoose";

export interface INote extends mongoose.Document {
  title: string;
  content: string;
  owner: string;
  col: string;
}

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, require: true, lowercase: true, trim: true },
    content: { type: String, require: true, lowercase: true, trim: true },
    owner: { type: String, require: true, trim: true },
    col: { type: String, lowercase: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model<INote>("notes", noteSchema);
