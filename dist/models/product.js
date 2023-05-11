import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true, enum: ["deporte", "videojuegos"] },
    buyers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
export const Product = mongoose.model("Product", productSchema);
