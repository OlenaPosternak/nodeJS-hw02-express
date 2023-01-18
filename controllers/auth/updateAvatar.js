const createError = require("http-errors");
const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs");
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { path: tempUload, originalname } = req.file;
  const { _id } = req.user;

  const imgName = `${_id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, imgName);
    fs.renameSync(tempUload, resultUpload);
    const avatarURL = path.join("public", "avatars", imgName);
    await User.findOneAndUpdate(_id, { avatarURL });
    res.json({
      status: "success",
      code: 200,
      data: {
        avatar: avatarURL,
      },
    });
  } catch (error) {
    fs.unlinkSync(tempUload);
    next(error);
  }
};

module.exports = updateAvatar;
