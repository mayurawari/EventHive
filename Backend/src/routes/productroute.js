import { Router } from "express";
import Product from "../config/models/productmodel.js";

const productroute = Router();

productroute.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

productroute.post("/", async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const newProduct = new Product({ name, price, description });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

productroute.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description },
      { new: true }
    );
    if (!updatedProduct) return res.status(404).send("Product not found");
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

productroute.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).send("Product not found");
    res.send("Product deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default productroute;


