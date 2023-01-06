const { Contact } = require("../../models/contacts");

const getAll = async (req, res, next) => {
  try {
    const contacts = await Contact.find({}, "name email phone favorite");

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
