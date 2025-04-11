import sessionSchema from "../../models/sessionSchema.js";

export const logout = async (req, res) => {
  const existing = await sessionSchema.findOne({ userId: req.userId });

  try {
    if (existing) {
      await sessionSchema.findOneAndDelete({ userId: req.userId });
      return res.status(200).json({
        success: true,
        message: "Session successfully ended",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User had no session",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
