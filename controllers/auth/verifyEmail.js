const { User } = require("../../models/user");
const createError = require("http-errors");

const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const { user } = await User.findOne(verificationToken);
    if (!user) {
      throw createError(404, `Not found varification token`);
    }
    await User.findOneAndUpdate(user._id, {
      verify: true,
      verificationToken: "",
    });
    
    res.json({
      status: "success",
      code: 200,
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmail;
