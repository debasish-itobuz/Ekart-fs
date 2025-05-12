import productSchema from "../../models/productSchema.js";

//To get all the products from the DB
// export const getAllProducts = async (req, res) => {
//   try {
//     const data = await productSchema.find({});
//     if (data) {
//       return res.status(200).json({
//         success: true,
//         message: "Products fetched successfully",
//         data: data,
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

//To get all products for buyer and get own products for seller
export const getAllProducts = async (req, res) => {
  try {
    const { userId, role } = req;
    console.log("print", userId, role);
    let totalProducts = [];
    if (role === "buyer") {
      const data = await productSchema.find({});
      totalProducts = data;
    } else if (role === "seller") {
      const data = await productSchema.find({ sellerId: userId });
      totalProducts = data;
    } else {
      throw new Error("Something went wrong");
    }
    if (totalProducts) {
      return res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        data: totalProducts,
        role,
        userId,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
