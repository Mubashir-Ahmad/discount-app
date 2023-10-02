import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'], // Specify that it's a Point
      required: true,
    },
    coordinates: {
      type: [Number], // Array of two numbers: longitude and latitude
      required: true,
    },
  },
  discount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "discount", // Reference the Discount model
    required: true,
  },
  category: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    ref: "category", // Reference the Category model
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Reference the User model
    required: true,
  },
});

// Create geospatial index
storeSchema.index({ location: "2dsphere" });

const storeModel = mongoose.model("store", storeSchema);

export default storeModel;
