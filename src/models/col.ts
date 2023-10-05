import mongoose from "mongoose";

export interface ICol extends mongoose.Document {
  name: string;
  owner: string;
}

const colSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, lowercase: true, trim: true },
    owner: { type: String, require: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICol>("cols", colSchema);
