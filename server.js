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

// create a model for products available
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

// post product
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

// create model for order
const Order = mongoose.model("order", new mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    email: String,
    name: String,
    address: String,
    total: Number,
    cartItems: [{
        _id: String,
        title: String,
        price: Number,
        count: Number
    }],
    },
    {
        timestamps: true,
    }
    )
)

// post to the completed order
app.post("/api/orders", async(req, res)=> {
    if(!req.body.name || 
        !req.body.email ||
        !req.body.address ||
        !req.body.total ||
        !req.body.cartItems
    ){
        return res.send({message: "Data is required."})
    }
    const order = await Order(req.body).save()
    res.send(order)
})

// order api
app.get("/api/orders", async(req, res) => {
    // get all orders
    const orders = await Order.find({})
    res.send(orders)
})

// delete order
app.delete("/api/orders/:id", async(req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id)
    res.send(order)
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log("server: http://localhost:5000"))