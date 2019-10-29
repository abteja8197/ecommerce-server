var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductsSchema = new Schema({
    title: String,
    description: String
});

var Products = mongoose.model("Product", ProductsSchema);
module.exports = Products;