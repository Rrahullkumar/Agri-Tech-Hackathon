// // middleware/auth.js
// import jwt from 'jsonwebtoken';
// import Seller from '../models/Seller.js';

// const authenticate = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization')?.replace('Bearer ', '');
    
//     if (!token) {
//       throw new Error('Authentication required');
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const seller = await Seller.findById(decoded.id);

//     if (!seller) {
//       throw new Error('Seller not found');
//     }

//     req.user = seller; // This sets the user object
//     next();
//   } catch (error) {
//     console.error('Auth error:', error.message);
//     res.status(401).send({ error: 'Please authenticate' });
//   }
// };

// export default authenticate;