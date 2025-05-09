import { instance } from "../../config/razorPay.js";
import orderSchema from "../../models/orderSchema.js";

//to handle payment operations in DB via frontend
export const paymentCheckout = async (req, res) => {
  try {
    const productId = req.params.productId;

    const options = {
      amount: Number(req.body.amount * 100),
      // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    const dbOrder = await orderSchema.create({
      razorpayOrderId: order.id,
      productId: productId,
      amount: order.amount / 100,
      buyerId: req.userId, //will set after setting header in frontend
    });

    return res.status(200).json({
      success: true,
      data: order,
      dbOrder: dbOrder,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
