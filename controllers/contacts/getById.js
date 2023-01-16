const createError = require("http-errors");
const { Contact } = require("../../models/contacts");

const getById = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const { _id } = req.user;

    const contactById = await Contact.findOne({
      _id: contactId,
      owner: _id,
    }).populate("owner", "_id email subscription");

    if (!contactById) {
      throw createError(404, `Invalid contact id = ${id}`);
    } else {
      res.json({
        status: "success",
        code: 200,
        data: {
          contact: contactById,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
