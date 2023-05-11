import mongoose from "mongoose";
import { IUser } from "./user.js";
export interface IProduct extends mongoose.Document {
    name: string;
    description: string;
    price: number;
    category: string;
    buyers: IUser["_id"][];
}
export declare const Product: mongoose.Model<IProduct, {}, {}, {}, mongoose.Document<unknown, {}, IProduct> & Omit<IProduct & {
    _id: mongoose.Types.ObjectId;
}, never>, any>;
