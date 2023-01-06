const createError = require("http-errors");
const { Contact } = require("../../models/contacts");

const remove = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      throw createError(404, `Current id does not exist ${id}`);
    }

    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: {
        deletedContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = remove;
