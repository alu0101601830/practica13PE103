import mongoose from "mongoose";
export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    username: string;
    preference: string;
}
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser> & Omit<IUser & {
    _id: mongoose.Types.ObjectId;
}, never>, any>;
