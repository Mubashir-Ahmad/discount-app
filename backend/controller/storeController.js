import { categoryModel } from "../model/categoryModel.js";
import storeModel from "../model/storeModel.js";
import discountmodel from "../model/discountModel.js";
import productModel from "../model/productModel.js";
import ApiFeatures from "../utils/apifeacture.js";
class storeController {
  // Create store
  static createstore = async (req, res) => {
    try {
      const { name, address, location, discount, category } = req.body;

      const existingCategory = await categoryModel.findOne({
        title: category,
      });

      const existingDiscount = await discountmodel.findOne({
        price: discount,
      });

      const store_create = new storeModel({
        name: name,
        address: address,
        location: {
          type: "Point", // Set the type property
          coordinates: [
            parseFloat(location.coordinates[0]),
            parseFloat(location.coordinates[1]),
          ], // Access coordinates properly
        },
        discount: existingDiscount,
        category: existingCategory.title,
        user: req.user.id,
      });

      const result = await store_create.save();
      res
        .status(200)
        .json({ success: true, message: "Store Created Successfully" });
    } catch (err) {
      console.log("store_discount Error:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };

  static searchstore = async (req, res) => {
    try {
      res.setHeader("Access-Control-Allow-Origin", "*");
      const { latitude, longitude } = req.query;
      // const {longitude} = req.query.longitude;
      // console.log(req.body)
      const validLatitude = parseFloat(latitude);
      const validLongitude = parseFloat(longitude);
      console.log(validLatitude, validLongitude);
      if (isNaN(validLatitude) || isNaN(validLongitude)) {
        return res.status(400).json({ message: "Invalid coordinates" });
      }

      const currentDate = new Date();

      const nearbyStores = await storeModel
        .find({
          location: {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: [validLongitude, validLatitude],
              },
              $maxDistance: 50000,
            },
          },
        })
        .populate("discount")
        .exec();

      const nearbyStoresWithActiveDiscounts = nearbyStores.filter((store) => {
        return store.discount && store.discount.expirationDate >= currentDate;
      });

      // Log the stores with active discounts
      console.log(
        "Nearby Stores With Active Discounts:",
        nearbyStoresWithActiveDiscounts
      );
      res
        .status(200)
        .json({ success: true, nearbyStores: nearbyStoresWithActiveDiscounts });
    } catch (err) {
      console.log("store_search Error:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };
  // All store
  static allstore = async (req, res, next) => {
    try {
      const store = await storeModel
        .find()
        .populate("user")
        .populate("discount");
      res.status(200).json({ success: true, store });
    } catch (err) {
      console.log("All_store Error:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };
  // Update store
  static updatestore = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { location } = req.body;
      const { discount, category } = req.body;
      const existingCategory = await categoryModel.findOne({
        title: category,
      });

      const existingDiscount = await discountmodel.findOne({
        price: discount,
      });
      const newstore_data = {
        name: req.body.name,
        address: req.body.address,
        location: {
          type: "Point", // Set the type property
          coordinates: [
            parseFloat(location.coordinates[0]),
            parseFloat(location.coordinates[1]),
          ], // Access coordinates properly
        },
        existingCategory,
        existingDiscount,
      };
      const store = await storeModel.findByIdAndUpdate(id, newstore_data, {
        new: true,
        runValidator: true,
      });
      res.status(200).json({
        success: true,
        message: "Update successfully",
        store,
      });
    } catch (err) {
      console.log("Update_store Error:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };
  static deletestore = async (req, res, next) => {
    try {
      const { id } = req.params;
      const store = await storeModel.findById(id);
      if (!store) {
        return next(
          new ErrorHandler(`store does not exist:${req.params}`, 400)
        );
      }
      await store.deleteOne();
      res.status(200).json({
        success: true,
        message: "delete store successfully",
        store,
      });
    } catch (err) {
      console.log("Delete_store Error:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };
  static fetchStoreAndProducts = async (req, res, next) => {

    try {
      const storeId = req.params.id;

      // Find the store by its ID
      const store = await storeModel.findById(storeId).exec();

      if (!store) {
        console.error("Store not found");
        return null;
      }

      // Find all products linked to the store and populate their categories
      const products = await productModel
        .find({ store: store._id })
        .populate("user")
        .populate("discount")
        .populate("category")
        .exec();

      // Group products by category
      const groupedProducts = {};

      products.forEach((product) => {
        const category = product.category && product.category.title; // Replace 'title' with the actual field name of the category
        if (!groupedProducts[category]) {
          groupedProducts[category] = [];
        }
        groupedProducts[category].push(product.toObject());
      });

      // Combine the store and grouped products into a single object
      const storeWithCategories = {
        store: store.toObject(),
        categories: Object.entries(groupedProducts).map(
          ([categoryName, categoryProducts]) => ({
            categoryName,
            products: categoryProducts,
          })
        ),
      };

      res.status(200).json({ success: true, storeWithCategories });
    } catch (err) {
      console.error("Error fetching store and products:", err);
      return null;
    }
  };
  static getstores = async (req, res, next) => {
    try {
      // console.log("store", req.query);
      // const categoryName = req.query.keyword;
      // const category = await categoryModel
      //   .findOne({ title: categoryName })
      //   .exec();
      // console.log("cate", category);
      // if (!category) {
      //   return res
      //     .status(404)
      //     .json({ success: false, message: "Category not found" });
      // }

      // const categoryId = category._id;
      // console.log(categoryId)
      // const storeCount = await storeModel.countDocuments();
      // const stores = await storeModel
      // .find({ category: categoryId })
      // .exec();
      // console.log(stores)
      const resultPerPage = 2;
      const storeCount = await storeModel.countDocuments();

      const apiFeature = new ApiFeatures(
        storeModel.find().populate("user").populate("discount"),
        req.query
      )
        .search()
        .filter();

      let store = await apiFeature.query;

      let filteredProductsCount = store.length;

      // apiFeature.pagination(resultPerPage);

      // products = await apiFeature.query;
      // console.log('poiuy',products,storeCount,filteredProductssCount)
      res.status(200).json({
        success: true,
        store,
        storeCount,
        filteredProductsCount,
      });
    } catch (error) {
      console.log("get_store_error", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };
}
export default storeController;
