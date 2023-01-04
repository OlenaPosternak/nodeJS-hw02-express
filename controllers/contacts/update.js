const createError = require("http-errors");
const { getContactById, updateContact } = require("../../models/contacts");

const update = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contactByID = await getContactById(id);
    if (!contactByID) {
      throw createError(404, `Invalid contact id ${id}`);
    }

    const updatedContact = await updateContact(id, req.body);

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
