
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserByUsername, registerUser , getUserById, updateUser, changePassword, getUserEmail} from '../models/userModel.js';
import { validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
// const JWT_SECRET = 'your_jwt_secret'; // Use environment variable in production
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET; // Store securely in .env
const refreshTokens = []; // Temporary storage (Use DB in production)

export const userRegister = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { U_Name, U_EMAIL, U_PHONE, U_Address, U_Username, U_PWD } = req.body;

    const existingUser = await getUserByUsername(U_Username);
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(U_PWD, 10);

    await registerUser({
      U_Name,
      U_EMAIL,
      U_PHONE,
      U_Address,
      U_Username,
      U_PWD: hashedPassword,
      U_Status: 'Active'
    });

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { U_Username, U_PWD } = req.body;
    const user = await getUserByUsername(U_Username);

    if (!user) return res.status(404).json({ message: 'User not found or invalid credentials' });

    const isMatch = await bcrypt.compare(U_PWD, user.U_PWD);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user.U_Id , username: user.U_Username }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Login failed' });
  }
};


export const userRefreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: "Refresh Token is not valid" });
  }

  jwt.verify(refreshToken, REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Refresh Token" });

    const newAccessToken = jwt.sign(
      { id: user.U_Id, username: user.U_Username },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.json({ newAccessToken });
  });
};

// ✅ Logout (Invalidate Refresh Token)
export const userLogout = (req, res) => {
  const { refreshToken } = req.body;
  refreshTokens = refreshTokens.filter(token => token !== refreshToken);
  res.json({ message: "User logged out" });
};

export const getUserProfile  = async (req, res) => {

  try
  {
    const user = await getUserById(req.user.id);

    if (!user) 
      {
        return res.status(404).json({ message: 'User not found' });
      }
      
      const {U_PWD, ...userData} = user;

      res.status(200).json({ user: userData });


  }
  catch(error)
  {
    console.error('Error getting user details:', error);
    res.status(500).json({ message: 'Failed to get user details' });
  }
}


/**
 * @route PUT /api/auth/profile
 * @desc Update user's profile
 * @access Private (requires token)
 */

export const updateUserProfile = async (req, res) => {

  try
  {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const userId = req.user.id; // Get the user ID from the token

    const { U_Name, U_EMAIL, U_PHONE, U_Address, U_Username } = req.body;

    if (!U_Name || !U_EMAIL || !U_PHONE || !U_Address || !U_Username) {
      
      return res.status(400).json({ message: 'All fields are required' });
    }

    const updatedUser = {
      
      U_Id: userId,
      U_Name,
      U_EMAIL,
      U_PHONE,
      U_Address,
      U_Username
    };

    const result = await updateUser(updatedUser);

    if (result.affectedRows > 0) {
      
      const user = await getUserById(userId);

      res.status(200).json({ message: 'Profile updated successfully', user});


    } 
    else 
    {
      
      res.status(404).json({ message: 'User not found' });  

    }
  }

  catch(error)
  {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Failed to update user profile' });
  }

}

/**
 * @route PUT /api/auth/profile
 * @desc Update user's changepassword
 * @access Private (requires token)
 */

export const changePasswordController = async (req, res) => {

  try 
  {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const userId = req.user.id; // Get the user ID from the token

    const {U_PWD, U_NEWPWD, U_CONFIRMPWD} = req.body;

    if (!U_PWD || !U_NEWPWD || !U_CONFIRMPWD) 
      {
        return res.status(400).json({ message: 'oldPassword and newPassword are required' });
      }

    const user = await getUserById(userId);
    
    if (!user) 
      {
        return res.status(404).json({ message: 'User not found' });
      }

    const isMatch = await bcrypt.compare(U_PWD, user.U_PWD);

    if (!isMatch) 
      {
        return res.status(401).json({ message: 'Invalid old password' });
      }
    
    if (U_NEWPWD !== U_CONFIRMPWD) 
      {
        return res.status(400).json({ message: 'New password and confirm password do not match' });
      }
    
    else if (U_NEWPWD === U_PWD)
      {
        return res.status(400).json({ message: 'New password cannot be the same as the old password' });    
      }  
    const hashedPassword = await bcrypt.hash(U_NEWPWD, 8);
    
    await changePassword({U_Id: userId, hashedPassword});

    res.status(200).json({ message: 'Password updated successfully', user});

  }

  catch(error)
  {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Failed to change password' });
  }


}

export const forgotPasswordController = async (req, res) => {

  const {U_EMAIL} = req.body;

  try
  {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await getUserEmail(U_EMAIL);

    if(!user)
    {
      return res.status(404).json({ message: 'Email not Registered' });
    }

    const token = jwt.sign({ id: user.U_Id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    const ResetPasswordLink = `http://localhost:5173/auth/resetpassword/${token}`; // Frontend page

    // Set up mail transport

    const transporter = nodemailer.createTransport({

      service: 'gmail',

      auth : {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
      },


    });

    const mailOptions = {

      from : `"R K Shop "<${process.env.SMTP_EMAIL}>`,

      to : user.U_EMAIL,

      subject : 'Reset Your Password',

      html :` <p>Hello ${user.U_Name},</p>
        <p>You requested to reset your password. Click the link below to proceed:</p>
        <a href="${ResetPasswordLink}" target="_blank">${ResetPasswordLink}</a>
        <p>This link will expire in 15 minutes.</p>`,
    };

    // Send the email

    await transporter.sendMail(mailOptions);

    res.json({message:'Password reset link has been sent to your email'});

  }

  catch(error)
  {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ message: 'Failed to send password reset email' });
  }
};

export const resetPasswordController = async (req, res) => {

  const {token} = req.params;
  const {U_NEWPWD, U_CONFIRMPWD} = req.body;

  if (!U_NEWPWD || !U_CONFIRMPWD || U_NEWPWD !== U_CONFIRMPWD)
  {
    return res.status(400).json({ message: 'New password and confirm password do not match or are empty' });
  }

  try 
  {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const decoded = jwt.verify(token,JWT_SECRET);

    const user = await getUserById(decoded.id);

    if(!user)
    {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(U_NEWPWD, 8);

    await changePassword({U_Id: decoded.id, hashedPassword});

    res.status(200).json({ message: 'Password updated successfully' });
  }

  catch(error)
  {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Invalid or expired token' });
  }
};
