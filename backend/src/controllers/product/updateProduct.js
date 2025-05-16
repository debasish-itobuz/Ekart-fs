// import productSchema from "../../models/productSchema.js";

// export const updateProduct = async (req, res) => {
//   try {
//     const { name, category, description, price } = req.body;
//     const productId = req.params.id;
//     const sellerId = req.userId;

//     if (req.role !== "seller") {
//       return res.status(401).json({
//         success: false,
//         message: "unauthorised access",
//       });
//     }

//     const product = await productSchema.findOne({
//       sellerId: sellerId,
//       _id: productId,
//     });

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     // Update only provided fields
//     if (name) product.name = name;
//     if (category) product.category = category;
//     if (description) product.description = description;
//     if (price) product.price = price;
//     if (req.file) {
//       const imageUrl = `http://localhost:8000/uploads/${req.file.filename}`;
//       product.pic = imageUrl; // Make sure this matches your schema field
//     }

//     await product.save();

//     return res.status(200).json({
//       success: true,
//       message: "Product updated successfully",
//       data: product,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export default updateProduct;

import productSchema from "../../models/productSchema.js";

export const updateProduct = async (req, res) => {
  try {
    const { name, category, description, price } = req.body;
    let imageUrl = "";
    if (req.file) {
      imageUrl = `http://localhost:8000/uploads/${req.file.filename}`;
    }
    const sellerId = req.userId;
    console.log(name, category, description, price, sellerId, imageUrl);

    const productId = req.params.id;
    console.log(productId);
    if (req.role !== "seller")
      return res.status(401).json({
        success: false,
        message: "unauthorised access",
      });
    const product = await productSchema.findOne({
      sellerId: sellerId,
      _id: productId,
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    product.name = name;
    product.category = category;
    product.description = description;
    product.price = price;
    product.img = imageUrl;
    await product.save();
    console.log(product);

    return res.status(200).json({
      success: true,
      message: "product updated successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default updateProduct;
