
// with ES module
import express from 'express';
import { userRegister, userLogin , userRefreshToken, userLogout} from '../controllers/authController.js';
import { registerValidation } from '../validations/authValidation.js';

const router = express.Router();

router.post('/register', registerValidation, userRegister);
router.post('/login', userLogin);
router.post('/refresh-token', userRefreshToken);
router.post('/logout', userLogout);
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

