const createError = require("http-errors");
const { Contact } = require("../../models/contacts");

const update = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const { _id } = req.user;

    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId, owner: _id },
      req.body,
      {
        new: true,
      }
    );
    if (!updatedContact) {
      throw createError(404, `Invalid contact id ${id}`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        contact: updatedContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = update;
