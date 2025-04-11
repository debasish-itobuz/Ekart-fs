import express from "express";
import { verification } from "../controllers/auth/registationTokenVerify.js";
import { hasToken } from "../middleware/hasToken.js";
import { userValidateSchema } from "../validators/userValidate.js";
import { validateData } from "../middleware/validateData.js";
import { logout } from "../controllers/auth/userLogout.js";
import { login } from "../controllers/auth/userLogin.js";
import { register } from "../controllers/auth/userRegister.js";

const authRoute = express.Router();

authRoute.post("/register/:role", validateData(userValidateSchema), register);
authRoute.get("/verify", verification);
authRoute.post("/login", validateData(userValidateSchema), login);
authRoute.delete("/logout", hasToken, logout);

export default authRoute;
