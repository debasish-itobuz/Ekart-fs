import orderSchema from "../../models/orderSchema.js";
import paymentSchema from "../../models/paymentSchema.js";

export const paymentFailed = async (req, res) => {
  const { order_id, payment_id } = req.params;
  console.log("orderrr", order_id);
  console.log("pay", payment_id);

  try {
    const order = await orderSchema.findOne({ razorpayOrderId: order_id });

    console.log("order :>> ", order);
    if (!order)
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });

    order.status = "failure";
    order.paymentStatus = "failed";
    await order.save();

    const existingPayment = await paymentSchema.findOne({
      razorpayOrderId: order_id,
    });

    console.log("this is failure", existingPayment);

    if (!existingPayment) {
      await paymentSchema.create({
        productId: order.productId,
        razorpayOrderId: order.razorpayOrderId,
        amount: order.amount,
        paymentType: "online",
        razorpayPaymentId: payment_id,
        razorpayPaymentSignature: null,
        status: "failed",
      });
    } else {
      existingPayment.status = "failed";
      existingPayment.save();
    }

    return res.status(200).json({
      success: false,
      message: "Status updated for failed payment",
      existingPayment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
