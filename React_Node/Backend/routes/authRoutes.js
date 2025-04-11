
// with ES module
import express from 'express';
import { userRegister, userLogin , userRefreshToken, userLogout, getUserProfile, updateUserProfile, changePasswordController, forgotPasswordController, resetPasswordController} from '../controllers/authController.js';
import { changePasswordValidation, forgotPasswordValidation, registerValidation, resetPasswordValidation, updateUserProfileValidation } from '../validations/authValidation.js';
import { verifyToken } from '../middlewear/authMiddlewear.js';

const router = express.Router();

router.post('/register', registerValidation, userRegister);
router.post('/login', userLogin);
router.post('/refresh-token', userRefreshToken);
router.post('/logout', userLogout);

router.get('/profile', verifyToken, getUserProfile);
router.put('/updateprofile', updateUserProfileValidation, verifyToken, updateUserProfile);
router.put('/changepassword', verifyToken, changePasswordValidation, changePasswordController);
router.post('/forgotpassword', forgotPasswordValidation,forgotPasswordController);
router.post('/resetpassword/:token', resetPasswordValidation,resetPasswordController);
export default router;




// without ES module
// const express = require('express');
// const { registeruser } = require('../controllers/authController');
// const { registerValidation } = require('../validations/authValidation');
// const { validationResult } = require('express-validator');

// const router = express.Router();

// router.post('/registeruser', registerValidation, (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
//     registeruser(req, res);
// });

// module.exports = router;

