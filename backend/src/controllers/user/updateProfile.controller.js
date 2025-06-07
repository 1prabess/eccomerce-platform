import { StatusCodes } from "http-status-codes";
import User from "../../models/user.model.js";

export const updateProfileController = async (req, res) => {
  try {
    const updateData = req.body;
    const userId = req.user._id;

    // If user wants to upload profile picture
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "profilePic",
      });

      updateData.profilePic = result.secure_url;

      // Delete temp file
      fs.unlinkSync(req.file.path);
    }

    const updatedProfile = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(StatusCodes.OK).json({
      message: "Profile updated successfully!",
      updatedProfile,
    });
  } catch (error) {
    console.log("Error in getProfile: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};
