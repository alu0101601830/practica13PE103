import mongoose from "mongoose";
import { IUser } from "./user.js";

export interface IProduct extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  category: string;
  buyers: IUser["_id"][];
}

const productSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, enum: ["deporte", "videojuegos"] },
  buyers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export const Product = mongoose.model<IProduct>("Product", productSchema);

