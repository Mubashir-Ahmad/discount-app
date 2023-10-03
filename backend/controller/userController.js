import ErrorHandler from "../utils/errorhandler.js";
import userModel from "../model/userModel.js";
import sendtoken from "../utils/jwt.js";
import multer from "multer";
// import sendEmail from "../utils/sendemail.js"
import Image from "../model/userModel.js";
import fs from "fs";
import { MongoClient, GridFSBucket, ObjectId } from "mongodb";
import cloudinary from 'cloudinary'
const DATABASE_URL =
  "mongodb+srv://mubbashirahmad:ahmad1122@discount-app.xng6cvr.mongodb.net/discount-app?retryWrites=true&w=majority";
class userController {
  // LOGIN USER
  static login = async (req, res, next) => {
    try {
      console.log("console", req.body);
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
      }
      const user = await userModel.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
      }
      const ispasswordmatched = await user.comparePassword(password);
      if (!ispasswordmatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
      }
      sendtoken(user, 200, res);
    } catch (err) {
      console.log("Login-controller Error", err);
    }
  };
  // REGISTER
  static userregister = async (req, res) => {
    try {
      console.log("user-register", req.body);
      const { name, email, password } = req.body;

      const user = await userModel.create({
        name,
        password,
        email,
      });
      res.status(200).json({
        success: true,
        user: user,
        message: "user register successfully ",
      });
    } catch (err) {
      console.log("Email-controller Error", err);
      res
        .status(500)
        .json({ success: false, message: "internal server error " });
    }
  };
  // LOGOUT
  static logout = async (req, res) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(200).json({ success: true, message: "Logout" });
    } catch (err) {
      console.log("Logout-controller Error", err);
      res.status(500).json({ success: false, message: "err" });
    }
  };
  // User detail
  static getuserdetail = async (req, res) => {
    try {
      res.setHeader("Access-Control-Allow-Origin", "*");
      const user_id = req.user.id;

      // Find the user by ID
      const user = await userModel.findById(user_id);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      console.log('user',user)
      res
      .status(200)
      .json({ success: true, user:user });
    } catch (error) {
      console.log("Error:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };

  // Update Profile
  static updateprofile = async (req, res, next) => {
    try {
      console.log('sasasa',req.files);
      const { name, email, password} = req.body;
      // if(!req.file){
      //   res.status(500).json({message:"no file upload"})
      // }
      // const result = await cloudinary.uploader.upload(req.file.path,{
      //   folder: "Images",
      //   width: 150,
      //   crop: "scale",
      // });
      // console.log('cloudinary',result)
      // // Create a new image document in your database
      // const newUserData = {
      //   name: name,
      //   email: email,
      //   password: password,
      //   Image : {
      //     publicId: result.public_id,
      //     url:  result.secure_url
      //   }
      // };
      // const userid = req.user.id;
      // const user = await userModel.findByIdAndUpdate(userid, newUserData, {
      //   new: true,
      //   runValidators: true,
      // });

      // res
      //   .status(200)
      //   .json({ success: true, message: "Updated successfully", user: user });
    } catch (err) {
      console.log("Update_profile Error:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };
  // Get all user ----(ADMIN)
  static getalluser = async (req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://the-indus.vercel.app"
    );
    const users = await userModel.find();
    res.status(200).json({
      success: true,
      users,
    });
  };
  // Get single user detail ---(admin)
  static getsingleuser = async (req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://the-indus.vercel.app"
    );
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return next(
        new ErrorHandler(`User doen not exist:${req.params.id}`, 400)
      );
    }
    res.status(200).json({
      success: true,
      user,
    });
  };

  // Delete user
  // Update user role
  static deleteuser = async (req, res, next) => {
    try {
      res.setHeader(
        "Access-Control-Allow-Origin",
        "https://the-indus.vercel.app"
      );
      console.log(req.params.id);
      const user = await userModel.findById(req.params.id);
      if (!user) {
        return next(
          new ErrorHandler(`User does not exist:${req.params.id}`, 400)
        );
      }
      await user.deleteOne();
      res.status(200).json({
        success: true,
        message: "delete user successfully",
        user,
      });
    } catch (error) {
      console.log("ggfgfggfgf", error);
    }
  };
}

export default userController;
