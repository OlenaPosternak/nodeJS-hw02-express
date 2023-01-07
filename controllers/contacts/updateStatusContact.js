const createError = require("http-errors");
const { Contact } = require("../../models/contacts");

const updateStatusContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });

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

module.exports = updateStatusContact;
