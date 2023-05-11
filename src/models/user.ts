import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  username: string;
  preference: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  preference: { type: String, required: true, enum: ["deporte", "videojuegos"] },
});

export const User = mongoose.model<IUser>("User", userSchema);
