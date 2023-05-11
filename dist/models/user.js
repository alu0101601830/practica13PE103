import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    preference: { type: String, required: true, enum: ["deporte", "videojuegos"] },
});
export const User = mongoose.model("User", userSchema);
