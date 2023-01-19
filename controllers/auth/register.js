const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { nanoid } = require("nanoid");

const { User } = require("../../models/user");

const sendEmail = require("../../helpers/sendEmail");

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

    const newUser = await User.create({
      email,
      password: hashedPassword,
      subscription,
      avatarURL,
      verificationToken,
    });

    const mail = {
      to: email,
      subject: "Confirmation of registering",
      text: "Please confirm your registration",
      html: `<a href ="http://localhost:3000/api/users/verify/:verificationToken${verificationToken}" target="_blank"> Please confirm registration</a>`,
    };
    await sendEmail(mail);

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
