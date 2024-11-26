// const jwt = require("jsonwebtoken");
import jwt from 'jsonwebtoken'

function verifyToken(req, res, next) {
  const token = req.cookies.Authtoken;
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, "your-secret-key");
    req.userType = decoded.userType;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}
export {verifyToken}
// module.exports = verifyToken;
