const { Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

require("dotenv").config();
const { SECRET_KEY } = process.env;

const { User } = require("../../models/user");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Unauthorized("Email or password is wrong");
    }
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      throw new Unauthorized("Email or password is wrong");
    }

    if (!user.verify) {
      throw createError(400, `Email not verify`);
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "2h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        token,
        user: {
          email,
          subscription: "starter",
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
