const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");

const { User } = require("../../models/user");

const register = async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict(`Email ${email} in use`);
    }
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const newUser = await User.create({
      email,
      password: hashedPassword,
      subscription,
    });

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        newUser: {
          email,
          subscription: "starter",
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
