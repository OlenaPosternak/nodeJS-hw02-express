const createError = require("http-errors");
const { getContactById } = require("../../models/contacts");

const getById = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contactById = await getContactById(id);

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