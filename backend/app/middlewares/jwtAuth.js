import jwt from 'jsonwebtoken'
// const SendmailTransport = require("nodemailer/lib/sendmail-transport");

import Admin from '../models/Admin.js';
import ApiError from '../../utils/ApiError.js';
/**
 * this middleware is used to check authentication for private activities
 */
const jwtAuth = (req, res, next) => {
  const headerToken = req.headers.authorization;
  if (!headerToken) {
    throw new ApiError(401, "Unauthorized");
  }
  const token = headerToken.split(" ")[1];
  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }
  try {
    const user = jwt.verify(token, process.env.SERECT_KEY);
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Token is expired!");
    }
    throw new ApiError(401, "Unauthorized");
  }
};

export default jwtAuth