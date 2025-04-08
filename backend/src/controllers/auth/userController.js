import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sellerSchema from "../../models/sellerSchema.js";
import buyerSchema from "../../models/buyerSchema.js";
import { verifyMail } from "../../emailVerify/verifyMail.js";
import sessionSchema from "../../models/sessionSchema.js";
dotenv.config();

//user registration
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
        registrationToken,
        data: user,
      });
    } else if (role === "seller") {
      await sellerSchema.create(user);

      return res.status(201).json({
        success: true,
        message: "Account created successfully",
        advice:
          "Please verify your email at earliest, you have 10 minutes to verify yourself",
        registrationToken,
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

//user login
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
        const existing = await sessionSchema.findOne({ userId: user._id });
        await sessionSchema.deleteOne(existing);
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

//user logout
export const logout = async (req, res) => {
  const existing = await sessionSchema.findOne({ userId: req.userId });

  try {
    if (existing) {
      await sessionSchema.findOneAndDelete({ userId: req.userId });
      return res.status(200).json({
        success: true,
        message: "Session successfully ended",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User had no session",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
