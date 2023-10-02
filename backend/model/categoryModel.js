import mongoose from "mongoose";

const categorySchema =  new mongoose.Schema({
    title:{
        type:String,
        required:[true ,"Please Enter category name"],
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
})
const categoryModel = mongoose.model('category',categorySchema);



const ProductcategorySchema =  new mongoose.Schema({
    title:{
        type:String,
        required:[true ,"Please Enter Product category name"],
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
})
const ProductcategoryModel = mongoose.model('productcategory',ProductcategorySchema);


export { categoryModel, ProductcategoryModel };