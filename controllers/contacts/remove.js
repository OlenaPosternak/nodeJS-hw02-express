const createError = require("http-errors");
const { Contact } = require("../../models/contacts");

const remove = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const { _id } = req.user;
 
    const deletedContact = await Contact.findOneAndDelete({
      _id: contactId,
      owner: _id,
    });
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
