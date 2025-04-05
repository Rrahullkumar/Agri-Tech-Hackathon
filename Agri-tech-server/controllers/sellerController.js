import Seller from '../models/Seller.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

// Register new seller
export const registerSeller = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password, phone, address } = req.body;
    
    // Check if seller exists
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ message: 'Seller already exists' });
    }

    // Create new seller
    const seller = await Seller.create({ name, email, password, phone, address });
    res.status(201).json({ message: 'Registration successful', seller });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login seller
// sellerController.js
export const loginSeller = async (req, res) => {
  const { email, password } = req.body;

  try {
    const seller = await Seller.findOne({ email });
    if (!seller) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ message: 'Login successful', seller });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};