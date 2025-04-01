
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserByUsername, registerUser , getUserById} from '../models/userModel.js';
import { validationResult } from 'express-validator';

const JWT_SECRET = 'your_jwt_secret'; // Use environment variable in production

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

    const token = jwt.sign({ id: user.U_ID, username: user.U_Username }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Login failed' });
  }
};






