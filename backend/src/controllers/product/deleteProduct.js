import productSchema from "../../models/productSchema.js";

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const sellerId = req.userId;

    if (req.role !== "seller")
      return res.status(401).json({
        success: false,
        message: "unauthorised access",
      });

    const product = await productSchema.findOneAndDelete({
      sellerId: sellerId,
      _id: productId,
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "no such product found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
