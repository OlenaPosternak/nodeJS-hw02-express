const createError = require("http-errors");
const { removeContact } = require("../../models/contacts");

const remove = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const deletedContact = await removeContact(id);
    if (!deletedContact) {
      throw createError(404, `Invalid contact id ${id}`);
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
