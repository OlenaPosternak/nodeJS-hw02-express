const { Contact } = require("../../models/contacts");

const add = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const newContact = await Contact.create({ ...req.body, owner: _id });
    
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        newContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
