import productSchema from "../../models/productSchema.js";

export const updateProduct = async (req, res) => {
  try {
    // const { name, category, description, price } = req.body;
    // const sellerId = req.userId;
    // console.log(name, category, description, price, sellerId);
    const productId = req.params.id;
    if (req.role !== "seller")
      return res.status(401).json({
        success: false,
        message: "unauthorised access",
      });
    const product = await productSchema.findById(productId);
    console.log(product);
    if (product) {
      return res.status(200).json({
        success: true,
        message: "product created successfully",
        data: product,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default updateProduct;
