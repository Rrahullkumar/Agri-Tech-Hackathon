import express from 'express';
import { body } from 'express-validator';
import { registerSeller, loginSeller } from '../controllers/sellerController.js';

const router = express.Router();

// Validation middleware
const validateRegistration = [
  body('name').not().isEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('phone').isMobilePhone(),
  body('address').not().isEmpty()
];

router.post('/register', validateRegistration, registerSeller);
router.post('/login', loginSeller);

export default router;