import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { verifyMail } from "../../emailVerify/verifyMail.js";
import buyerSchema from "../../models/buyerSchema.js";
import sellerSchema from "../../models/sellerSchema.js";
dotenv.config();

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { role } = req.params;
    const roles = ["buyer", "seller"];

    if (!roles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role required",
      });
    }

    const oldBuyer = await buyerSchema.findOne({
      email: email,
    });
    const oldSeller = await sellerSchema.findOne({
      email: email,
    });

    if (oldBuyer || oldSeller) {
      return res.status(400).json({
        success: false,
        message: "Email id already exists. Try another",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const registrationToken = jwt.sign({ email }, process.env.secretKey, {
      expiresIn: "5m",
    });
    const user = {
      name: name,
      email: email,
      password: hashedPassword,
      token: registrationToken,
    };

    verifyMail(registrationToken, email);

    if (role === "buyer") {
      await buyerSchema.create(user);

      return res.status(201).json({
        success: true,
        message: "Account created successfully",
        advice:
          "Please verify your email at earliest, you have 30 minutes to verify yourself",
        data: user,
      });
    } else if (role === "seller") {
      await sellerSchema.create(user);

      return res.status(201).json({
        success: true,
        message: "Account created successfully",
        advice:
          "Please verify your email at earliest, you have 10 minutes to verify yourself",
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};
