const mongoose = require("mongoose");

// Define the Product Schema
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
});

// Create the Product model based on the schema
const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
