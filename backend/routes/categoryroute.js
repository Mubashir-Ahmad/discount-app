import express from 'express';
import categoryController from '../controller/categoryContoller.js'
import { isauthenticated,ISauthenticated, authorizrRoles, isAuthenticated } from '../middleware/auth.js';
import productCategoryController from '../controller/productCategoryController.js';

const router = express.Router();

// Create category

router.post("/create/category",ISauthenticated,categoryController.createcategory)










// create product category

router.post("/create/productcategory",ISauthenticated, productCategoryController.createProductcategory )


export default router;
 