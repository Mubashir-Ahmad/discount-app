import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a product name"],
  },
  description: {
    type: String,
    required: [true, "Please enter a product description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter a product price"],
    maxLength: [8, "Price should be 8 digits"],
  },
  discount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "discount", // Reference the Discount model
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productcategory", // Reference the Category model
    required: true,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "store", // Reference the Category model
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user", // Reference the User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const productModel = mongoose.model("Product", productSchema);

export default productModel;
