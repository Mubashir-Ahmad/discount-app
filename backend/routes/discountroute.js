import express from 'express';
import discountController from '../controller/discountController.js';
import { isauthenticated ,isAuthenticated ,ISauthenticated,authorizrRoles } from '../middleware/auth.js';

const router = express.Router();

// Create discount 
router.post("/create/discount",ISauthenticated,discountController.creatediscount)

// all discount
router.get("/all/discount",isAuthenticated,discountController.alldiscount)

// update discount
router.put("/update/discount/:id",ISauthenticated,discountController.updatediscount)

// Delete discount
router.delete("/delete/discount/:id",ISauthenticated,discountController.updatediscount)









export default router;
 