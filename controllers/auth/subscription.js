const createError = require("http-errors");
const { User } = require("../../models/user");

const updateSubscription = async (req, res, next) => {
  try {
    // const contactId = req.params.contactId;
    const { _id } = req.user;
 
    const updatedUser = await User.findOneAndUpdate(
      {owner: _id },
      req.body,
      {
        new: true,
      }
    );

    if (!updatedUser) {
      throw createError(404, `Invalid user id ${id}`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
