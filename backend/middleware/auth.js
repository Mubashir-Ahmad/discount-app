import ErrorHandler from "../utils/errorhandler.js";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

const isauthenticated = async (req, res, next) => {
  try {
    console.log("A auth", req.rawHeaders[13]);
    const token = req.rawHeaders[13];
    if (!token) {
      return next(new ErrorHandler("please Login to access this resources"));
    }
    const code = jwt.verify(token, process.env.jwt_SECRET);
    req.user = await userModel.findById(code.id);
    req.userModel = await userModel.findById(code.id);
    next();
  } catch (err) {
    console.log("isauthenticated", err);
  }
};
const isAuthenticated = async (req, res, next) => {
  try {
    console.log("A auth", req.rawHeaders[13]);
    const token = req.rawHeaders[13].split("=")[1];
    if (!token) {
      return next(new ErrorHandler("please Login to access this resources"));
    }
    const code = jwt.verify(token, process.env.jwt_SECRET);
    req.user = await userModel.findById(code.id);
    req.userModel = await userModel.findById(code.id);
    next();
  } catch (err) {
    console.log("isauthenticated", err);
  }
};
const ISauthenticated = async (req, res, next) => {
  try {
    console.log("rrrb", req.rawHeaders[17]);
    const token = req.rawHeaders[17].split("=")[1];
    // console.log('tok',token)
    if (!token) {
      return next(
        new ErrorHandler("please lllogin to access this resource", 401)
      );
    }
    const codedecode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await userModel.findById(codedecode.id);
    req.userModel = await userModel.findById(codedecode.id);
    next();
  } catch (err) {
    console.log(err);
  }
};
const ISAuthenticated = async (req, res, next) => {
  // try{
  try {
    console.log("tok1", req);
    const token = req.headers.authorization.replace("Bearer ", ""); // Extract the token from the header
    // const token = req.rawHeaders[17].split('=')[1]
    // console.log('token2',req.headers.authorization)
    if (!token) {
      return next(
        new ErrorHandler("please lllogin to access this resource", 401)
      );
    }
    const codedecode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await userModel.findById(codedecode.id);
    req.userModel = await userModel.findById(codedecode.id);
    next();
  } catch (err) {
    console.log(err);
  }
};
const ISAUthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log("token", token);
    if (!token) {
      return next(
        new Errorhandler("please login to access this resourcce", 401)
      );
    }
    const codedecode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("codee", codedecode);
    req.user = await userModel.findById(codedecode.id);
    req.userModel = await userModel.findById(codedecode.id);
    next();
  } catch (err) {
    console.log(err);
    return next(err); // Pass any errors to the error handling middleware
  }
};
const authorizrRoles = (...roles) => {
  try {
    return (req, res, next) => {
      console.log(req.userModel.role);
      if (!roles.includes(req.userModel.role)) {
        return next(
          new ErrorHandler(
            `Role ${req.userModel.role} is not allowed to access this role`,
            403
          )
        );
      }
      next();
    };
  } catch (err) {
    console.log(err);
  }
};
export {
  isauthenticated,
  ISAuthenticated,
  isAuthenticated,
  ISauthenticated,
  ISAUthenticated,
  authorizrRoles,
};
