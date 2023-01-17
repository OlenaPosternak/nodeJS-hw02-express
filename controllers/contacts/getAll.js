const { Contact } = require("../../models/contacts");

const getAll = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;

    const contacts = await Contact.find(
      favorite ? { owner: _id, favorite } : { owner: _id },
      "name email phone favorite",
      { skip, limit }
    ).populate("owner", "email subscription");

    res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
