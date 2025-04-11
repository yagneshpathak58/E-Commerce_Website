import { body } from 'express-validator';

export const registerValidation = [
    body('U_Name').notEmpty().withMessage("Name is required"),
    body('U_EMAIL').isEmail().withMessage("Valid email required"),
    body('U_PHONE').notEmpty().withMessage("Phone required"),
    body('U_Username').notEmpty().withMessage("Username required"),
    body('U_PWD')
        .isLength({ min: 8 }).withMessage("Password must be at least 8 chars")
        .matches(/\d/).withMessage("Must contain a number")
        .matches(/[a-z]/).withMessage("Must contain a lowercase letter")
        .matches(/[A-Z]/).withMessage("Must contain an uppercase letter")
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage("Must contain a special character")
];

export const updateUserProfileValidation = [
    body('U_Name').notEmpty().withMessage("Name is required"),
    body('U_EMAIL').isEmail().withMessage("Valid email required"),
    body('U_PHONE').notEmpty().withMessage("Phone required"),
    body('U_Username').notEmpty().withMessage("Username required")
];

export const changePasswordValidation = [
    body('U_PWD')
      .isLength({ min: 8 }).withMessage("Old Password must be at least 8 chars")
      .matches(/\d/).withMessage("Must contain a number")
      .matches(/[a-z]/).withMessage("Must contain a lowercase letter")
      .matches(/[A-Z]/).withMessage("Must contain an uppercase letter")
      .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage("Must contain a special character"),
  
    body('U_NEWPWD')
      .isLength({ min: 8 }).withMessage("New Password must be at least 8 chars")
      .matches(/\d/).withMessage("Must contain a number")
      .matches(/[a-z]/).withMessage("Must contain a lowercase letter")
      .matches(/[A-Z]/).withMessage("Must contain an uppercase letter")
      .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage("Must contain a special character"),
  
    body('U_CONFIRMPWD')
      .notEmpty().withMessage("Confirm Password is required")
  ];

  export const forgotPasswordValidation = [
    body('U_EMAIL').isEmail().withMessage("Valid email required")
  ];

  export const resetPasswordValidation = [
    
    body('U_NEWPWD')
      .isLength({ min: 8 }).withMessage("New Password must be at least 8 chars")
      .matches(/\d/).withMessage("Must contain a number")
      .matches(/[a-z]/).withMessage("Must contain a lowercase letter")
      .matches(/[A-Z]/).withMessage("Must contain an uppercase letter")
      .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage("Must contain a special character"),
  
    body('U_CONFIRMPWD')
      .notEmpty().withMessage("Confirm Password is required")
  ];
  

// without ES module
// const { body } = require('express-validator');

// exports.registerValidation = [
//     body('U_Name').not().isEmpty().withMessage("Name is required"),
//     body('U_EMAIL').isEmail().withMessage("Valid Email is required"),
//     body('U_PHONE').not().isEmpty().withMessage("Phone is required"),
//     body('U_Address').not().isEmpty().withMessage("Address is required"),
//     body('U_Username').not().isEmpty().withMessage("Username is required"),
//     body('U_PWD')
//         .isLength({ min: 8 })
//         .withMessage("Password must be at least 8 characters")
//         .matches(/\d/).withMessage("Must contain a number")
//         .matches(/[a-z]/).withMessage("Must contain a lowercase letter")
//         .matches(/[A-Z]/).withMessage("Must contain an uppercase letter")
//         .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage("Must contain a special character")
// ];
