import multer from "multer";
import path from "path";
// import productSchema from "../../models/productSchema.js";

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
});

// export const uploadProducts = async (req, res) => {
//   try {
//     const id = req.params.id;
//     // console.log(("prrod", id));

//     if (!req.file) {
//       return res.status(404).json({ message: "No file uploaded." });
//     }
//     const product = await productSchema.findById(id);
//     if (product) {
//       product.pic = "http://localhost:8000/uploads/" + req.file.filename;
//       await product.save();
//       return res.status(200).json({
//         success: true,
//         message: `File uploaded successfully: ${req.file.filename}`,
//         data: req.file.filename,
//       });
//     } else {
//       return res.status(404).json({
//         success: false,
//         message: "Product not Found",
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
