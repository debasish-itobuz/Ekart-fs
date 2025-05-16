import productSchema from "../../models/productSchema.js";

export const createProduct = async (req, res) => {
  try {
    const { name, category, description, price } = req.body;
    const sellerId = req.userId;

    if (req.role !== "seller") {
      return res.status(401).json({
        success: false,
        message: "unauthorised access",
      });
    }

    // Handle image if uploaded
    let imageUrl = "";
    if (req.file) {
      imageUrl = `http://localhost:8000/uploads/${req.file.filename}`;
    }

    const data = await productSchema.create({
      name,
      category,
      description,
      price,
      pic: imageUrl, // Save image URL to DB
      sellerId,
    });

    return res.status(200).json({
      success: true,
      message: "Product created successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
