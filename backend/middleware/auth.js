const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const adminModel = require('../models/admin');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Middleware: authenticate regular user from Bearer token
async function isLoggedInAsUser(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized: no token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const data = jwt.verify(token, JWT_SECRET);
    const user = await userModel.findOne({ email: data.email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized: user not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Unauthorized: invalid token' });
  }
}

// Middleware: authenticate admin from Bearer token
async function isLoggedInAsAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized: no token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const data = jwt.verify(token, JWT_SECRET);
    const admin = await adminModel.findOne({ email: data.email });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Unauthorized: admin not found' });
    }
    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Unauthorized: invalid token' });
  }
}

module.exports = { isLoggedInAsUser, isLoggedInAsAdmin };
