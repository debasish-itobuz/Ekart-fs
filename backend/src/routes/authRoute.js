import express from "express";
import { login, logout, register } from "../controllers/auth/userController.js";
import { verification } from "../controllers/auth/registationTokenVerify.js";
import { hasToken } from "../middleware/hasToken.js";
import { userValidateSchema } from "../validators/userValidate.js";
import { validateData } from "../middleware/validateData.js";

const authRoute = express.Router();

authRoute.post("/register/:role", validateData(userValidateSchema), register);
authRoute.get("/verify", verification);
authRoute.post("/login", validateData(userValidateSchema), login);
authRoute.delete("/logout", hasToken, logout);

export default authRoute;
