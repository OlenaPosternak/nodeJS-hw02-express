const { User } = require("../../models/user");
const createError = require("http-errors");
require("dotenv").config();

const { LOCAL_HOST } = process.env;

const sendEmail = require("../../helpers/sendMail");

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
      html: `<a href ="http://${LOCAL_HOST}/api/users/verify/:verificationToken${user.verificationToken}" target="_blank"> Please confirm registration</a>`,
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
