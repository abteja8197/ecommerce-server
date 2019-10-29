const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

var mongoose = require('mongoose');
var Products = require("./models/products");
mongoose.connect('mongodb://localhost:27017/products');

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
    console.log("Connection Succeeded");
});

app.get('/products', (req, res) => {
    Products.find({}, 'title description', function (error, products) {
        if (error) {
            console.error('error');
        }
        res.send({
            products: products
        })
    })
})
app.post('/products', (req, res) => {
    var db = req.db;
    var title = req.body.title;
    var description = req.body.description;
    var new_products = new Products({
        title: title,
        description: description
    })

    new_products.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true,
            message: 'Product saved successfully!'
        })
    })
})

app.listen(process.env.PORT || 8081)