const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(bodyParser.json());

// connect to database
mongoose.connect("mongodb://localhost/shopping-cart-db", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

// create a model
const Product = mongoose.model("products", new mongoose.Schema({
    _id: {type: String, default: shortid.generate},
    title: String, 
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
}))

app.get("/api/products", async (req, res) => {
    //get all products from model
    const products = await Product.find()
    res.send(products)
})

app.post("/api/products", async (req, res) => {
    const newProduct = new Product(req.body)
    // save new product in database
    const savedProduct = await newProduct.save()
    res.send(savedProduct)
})

//delete product
app.delete("/api/products/:id", async(req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    res.send(deletedProduct)
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log("server: http://localhost:5000"))