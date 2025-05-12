import productSchema from "../../models/productSchema.js";

export const searchSortPaginateProduct = async (req, res) => {
  try {
    const {
      sortField = "name",
      sortOrder = "asc",
      page = 1,
      limit = 6,
      searchText,
    } = req.query;
    const { userId, role } = req;
    console.log("userid", userId);
    console.log("role", role);

    console.log("search", searchText);

    console.log("seller", req.userId);

    if (role === "buyer") {
      const filter = {};

      if (searchText) {
        filter.name = { $regex: searchText, $options: "i" };
      }
      console.log("search", searchText);

      const skip = (page - 1) * limit;

      const product = await productSchema
        .find(filter)
        .sort({ [sortField]: sortOrder === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(Number(limit));

      console.log("product", product);

      const totalProducts = await productSchema.countDocuments(filter); //total notes in schema of all user
      const totalPages = Math.ceil(totalProducts / limit);

      return res.status(200).json({
        success: true,
        message: "Product fetched successfully.",
        product,
        pagination: {
          totalProducts,
          currentPage: parseInt(page),
          totalPages,
          limit,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
