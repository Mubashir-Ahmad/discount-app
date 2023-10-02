import mongoose from "mongoose";
const discountSchema =  new mongoose.Schema({
    title:{
        type:String,
        required:[true ,"Please Enter discount name"],
    },
    price:{
        type:Number,
        required:true,
        default:0
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
      expirationDate: {
        type: Date, // Store the expiration date
        required: true,
      },
})
const discountmodel = mongoose.model("discount",discountSchema);

export default discountmodel