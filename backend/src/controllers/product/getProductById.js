import productSchema from "../../models/productSchema.js";

export const getProductById = async (req, res) => {
  try {
    const { userId, role } = req;
    // console.log(userId, role);
    const productId = req.params.id;

    const data = await productSchema.findOne({ _id: productId });
    if (role === "seller" && data.sellerId.toHexString() !== userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
