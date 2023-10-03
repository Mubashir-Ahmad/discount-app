import express from 'express';
import userController from '../controller/userController.js';
import {isauthenticated,ISAuthenticated,ISAUthenticated,isAuthenticated,ISauthenticated ,authorizrRoles} from '../middleware/auth.js';
import multer from 'multer';
import path from 'path'
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log('hello122121')
      cb(null, 'uploads'); // Set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      console.log('hello122121assasasasa')
      cb(null,Date.now() + path.extname(file.originalname)); // Use the original file name
    },
  });
  
  const upload = multer({ storage: storage });

// User Register
router.post('/register', userController.userregister);

// Login User
router.post('/login',  userController.login);

// Logout user
router.post('/logout', userController.logout);

// userdetail
router.get('/me',ISAuthenticated,userController.getuserdetail);

// update profile
router.put('/me/update',ISAUthenticated ,userController.updateprofile)

// Get all user detail -- Admin
router.get('/admin/user', isAuthenticated ,userController.getalluser);

// Get single user detail
router.get('/admin/user/:id', isAuthenticated, authorizrRoles('admin'), userController.getsingleuser);

// delete user
router.delete('/admin/user/:id', isAuthenticated ,authorizrRoles('admin'),userController.deleteuser);
export default router;
 