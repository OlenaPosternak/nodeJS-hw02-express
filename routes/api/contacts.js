const express = require("express");
const createError = require("http-errors");
const { contactsSchema } = require("../../shemas");

const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();

    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contactById = await getContactById(id);

    if (!contactById) {
      throw createError(404, `Invalid contact id `);
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
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);

    if (error) {
      throw createError(400, error.details[0].message);
    }

    const contact = await addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
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
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);

    if (error) {
      throw createError(400, error.details[0].message);
    }

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
});

module.exports = router;
