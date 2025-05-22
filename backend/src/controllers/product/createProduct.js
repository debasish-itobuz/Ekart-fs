import productSchema from "../../models/productSchema.js";

export const createProduct = async (req, res) => {
  try {
    const { name, category, description, price } = req.body;
    const sellerId = req.userId;

    if (req.role !== "seller") {
      return res.status(401).json({
        success: false,
        message: "Unauthorised access",
      });
    }

    // Ensure image is uploaded
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        message: "No product image uploaded. Please add an image.",
      });
    }

    // Validate file MIME type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid file type. Only image files (jpeg, png, webp, gif) are allowed.",
      });
    }

    const imageUrl = `http://localhost:8000/uploads/${req.file.filename}`;

    const data = await productSchema.create({
      name,
      category,
      description,
      price,
      pic: imageUrl,
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
