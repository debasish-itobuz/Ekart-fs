import productSchema from "../../models/productSchema.js";

export const createProduct = async (req, res) => {
  try {
    const { name, category, description, price } = req.body;
    const sellerId = req.userId;
    if (req.role !== "seller")
      return res.status(401).json({
        success: false,
        message: "unauthorised access",
      });

    const data = await productSchema.create({
      name,
      category,
      description,
      price,
      sellerId: sellerId,
    });
    if (data) {
      return res.status(200).json({
        success: true,
        message: "product created successfully",
        data: data,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default createProduct;
