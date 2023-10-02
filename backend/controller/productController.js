import { ProductcategoryModel, categoryModel } from "../model/categoryModel.js";
import productModel from "../model/productModel.js";
import discountmodel from "../model/discountModel.js";
import storeModel from "../model/storeModel.js";
import productCategoryController from "./productCategoryController.js";
import mongoose from "mongoose";

class productController {
  static createproduct = async (req, res) => {
    try {
      const { name, description, discount, storeId, price, category } =
        req.body;

      const existingCategory = await ProductcategoryModel.findOne({
        title: category,
      });

      const existingDiscount = await discountmodel.findOne({
        price: discount,
      });

      const existingStore = await storeModel.findOne({
        _id: new mongoose.Types.ObjectId(storeId),
      });
      console.log("category", existingCategory);
      const product_create = new productModel({
        name: name,
        description: description,
        price: price,
        user: req.user.id,
        discount: existingDiscount,
        category: existingCategory,
        store: existingStore,
      });

      const result = await product_create.save();
      console.log("product", result);
      res.status(200).json({ success: true, message: "Product Created" });
    } catch (error) {
      console.log("product Error:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };
}

export default productController;
