import express from "express";
import mongoose from "mongoose";
import { connect } from 'mongoose';
import { User } from "./models/user.js";
import { Product } from "./models/product.js";
const app = express();
app.use(express.json());
connect('mongodb://127.0.0.1:27017/dsi-assessment').then(() => {
    console.log('Connected to the database');
}).catch(() => {
    console.log('Something went wrong when conecting to the database');
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
        console.log("API server running on port 3000");
    });
});
// Rutas para usuarios
app.post("/users", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.get("/users", async (_req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.get("/users/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }
        else {
            res.status(200).json(user);
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.patch("/users/:username", async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ username: req.params.username }, req.body, {
            new: true,
        });
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }
        else {
            res.status(200).json(user);
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.delete("/users/:username", async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ username: req.params.username });
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }
        else {
            // Eliminar referencia a los productos comprados por el usuario
            await Product.updateMany({ buyers: user._id }, { $pull: { buyers: user._id } });
            res.status(200).json(user);
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Rutas para productos
app.post("/products", async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.get("/products", async (_req, res) => {
    try {
        const products = await Product.find().populate("buyers", "username email");
        res.status(200).json(products);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.get("/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("buyers", "username email");
        if (!product) {
            res.status(404).json({ error: "Product not found" });
        }
        else {
            res.status(200).json(product);
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.patch("/products/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            res.status(404).json({ error: "Product not found" });
        }
        else {
            res.status(200).json(product);
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.delete("/products/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            res.status(404).json({ error: "Product not found" });
        }
        else {
            res.status(200).json(product);
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
