import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied! No token provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_CODE);

    req.user = decoded;

    next();
  } catch (error) {
    console.error("Auth Error:", error);
    return res.status(401).json({ message: "Invalid or Expired Token!" });
  }
};
