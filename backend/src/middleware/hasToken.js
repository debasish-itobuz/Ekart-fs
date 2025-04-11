import jwt from "jsonwebtoken";
import buyerSchema from "../models/buyerSchema.js";
import sellerSchema from "../models/sellerSchema.js";
import sessionSchema from "../models/sessionSchema.js";
import { logout } from "../controllers/auth/userLogout.js";


export const hasToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        success: false,
        message: "Access token is missing or invalid",
      });
    } else {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, process.env.secretKey, async (err, decoded) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            await logout();
            return res.status(400).json({
              success: false,
              message:
                "Access token has expired, use refreshToken to generate again",
            });
          } else
            return res.status(400).json({
              success: false,
              message: "Access token is missing or invalid",
            });
        } else {
          const { id, role } = decoded;
          const buyer = await buyerSchema.findById(id);
          const seller = await sellerSchema.findById(id);

          const user = buyer || seller;
          if (!user) {
            return res.status(404).json({
              success: false,
              message: "user not found",
            });
          }
          const existing = await sessionSchema.findOne({ userId: id });
          if (existing) {
            req.userId = id;
            req.role = role;
            next();
          } else {
            return res.status(200).json({
              success: true,
              message: "User logged out already",
            });
          }
        }
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Could not access",
    });
  }
};
