import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import buyerSchema from "../../models/buyerSchema.js";
import sellerSchema from "../../models/sellerSchema.js";
import sessionSchema from "../../models/sessionSchema.js";
dotenv.config();

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const buyer = await buyerSchema.findOne({ email: email });
    const seller = await sellerSchema.findOne({ email: email });

    const user = buyer || seller;
    const role = buyer ? "buyer" : "seller";
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) {
        return res.status(402).json({
          success: false,
          message: "Incorrect password",
        });
      } else if (passwordCheck && user.isVerified === true) {
        await sessionSchema.findOneAndDelete({
          userId: user._id,
        });
        await sessionSchema.create({ userId: user._id });

        const accessToken = jwt.sign(
          {
            id: user._id,
            role: role,
          },
          process.env.secretKey,
          {
            expiresIn: "10days",
          }
        );

        const refreshToken = jwt.sign(
          {
            id: user._id,
            role: role,
          },
          process.env.secretKey,
          {
            expiresIn: "30days",
          }
        );

        return res.status(200).json({
          success: true,
          message: "Logged in Successfully",
          accessToken: accessToken,
          refreshToken: refreshToken,
          data: user,
          role,
        });
      } else {
        res.status(200).json({
          message: "Complete Email verification then Login..",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
