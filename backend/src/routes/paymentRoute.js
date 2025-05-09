import express from "express";
import { paymentCheckout } from "../controllers/payment/paymentCheckout.js";
import { paymentVerification } from "../controllers/payment/paymentVerification.js";
import { hasToken } from "../middleware/hasToken.js";
import { paymentFailed } from "../controllers/payment/paymentFailed.js";

const paymentRoute = express.Router();

paymentRoute.post("/paymentCheckout/:productId", hasToken, paymentCheckout);
paymentRoute.post("/paymentVerification", paymentVerification);
paymentRoute.post("/paymentFailed/:order_id/:payment_id", paymentFailed);

export default paymentRoute;
