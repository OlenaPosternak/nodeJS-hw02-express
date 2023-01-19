const { User } = require("../../models/user");
const createError = require("http-errors");

const sendEmail = require("../../helpers/sendEmail");

const resendVerifyEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const { user } = await User.findOne(email);
    if (!user) {
      throw createError(404, `Not found`);
    }
    if (user.verify) {
      throw createError(400, `Verification has already been passed`);
    }
    const mail = {
      to: email,
      subject: "Confirmation of registering",
      text: "Please confirm your registration",
      html: `<a href ="http://localhost:3000/api/users/verify/:verificationToken${user.verificationToken}" target="_blank"> Please confirm registration</a>`,
    };
    await sendEmail(mail);

    res.json({
      status: "success",
      code: 200,
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerifyEmail;
