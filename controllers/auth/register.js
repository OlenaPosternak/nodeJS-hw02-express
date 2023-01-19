const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { nanoid } = require("nanoid");
require("dotenv").config();

const { LOCAL_HOST } = process.env;

const { User } = require("../../models/user");

const sendEmail = require("../../helpers/sendMail");

const register = async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict(`Email ${email} in use`);
    }
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const avatarURL = gravatar.url(email);

    const verificationToken = nanoid();

    const mail = {
      to: email,
      subject: "Confirmation of registering",
      text: "Please confirm your registration",
      html: `<a href ="http://${LOCAL_HOST}/api/users/verify/:verificationToken${verificationToken}" target="_blank"> Please confirm registration</a>`,
    };
    await sendEmail(mail);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      subscription,
      avatarURL,
      verificationToken,
    });

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        newUser: {
          email,
          subscription: "starter",
          avatarURL,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
