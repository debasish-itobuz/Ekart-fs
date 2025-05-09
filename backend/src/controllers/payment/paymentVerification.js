import crypto from "crypto";
import orderSchema from "../../models/orderSchema.js";
import paymentSchema from "../../models/paymentSchema.js";

export const paymentVerification = async (req, res) => {
  try {
    console.log("hgfd", req.body);
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      console.log("inside authenticate");
      const order = await orderSchema.findOne({
        razorpayOrderId: razorpay_order_id,
      });

      const payment = await paymentSchema.create({
        productId: order.productId,
        razorpayOrderId: order.razorpayOrderId,
        amount: order.amount,
        paymentType: "online",
        razorpayPaymentId: razorpay_payment_id,
        razorpayPaymentSignature: razorpay_signature,
        status: "paid",
      });
      console.log("payment", payment);
      order.paymentId = payment._id;
      order.paymentStatus = "paid";
      order.status = "confirmed";
      await order.save();

      // res.redirect("http://localhost:5173/home");
      res.redirect(
        `http://localhost:5173/paymentSuccess?reference=${razorpay_payment_id},${razorpay_order_id}`
      );
    } else {
      console.log("not authenticate");
      return res.status(400).json({
        success: true,
        message: "Payment is not authenticated",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};
