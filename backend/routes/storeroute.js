import express from 'express';
import storeController from '../controller/storeController.js';
import { isauthenticated,ISAUthenticated,ISauthenticated,isAuthenticated , authorizrRoles, ISAuthenticated } from '../middleware/auth.js';
import productController from '../controller/productController.js';


const router = express.Router();


// Search store ,ISauthenticated // jab complete ho lgana hai
router.get("/search/store",storeController.searchstore)


// Create Store
router.post("/create/store",storeController.createstore)

// View store
router.get("/store",storeController.allstore)

// Update store
router.put("/update/store/:id",ISauthenticated,storeController.updatestore)

// Delete store
router.delete("/delete/store/:id",isAuthenticated,storeController.deletestore)

// Single store
router.get("/single/store/:id",ISAUthenticated,storeController.fetchStoreAndProducts)


// get stores
router.get("/get/stores",ISAuthenticated,storeController.getstores)









// Product Routes
router.post("/create/product",ISauthenticated,productController.createproduct)


export default router;
 