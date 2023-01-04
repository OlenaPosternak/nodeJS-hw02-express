const express = require("express");

const { contactsSchema } = require("../../shemas");

const { validation } = require("../../middlewares");

const validateMiddleware = validation(contactsSchema);
const router = express.Router();
const { contacts: controllers } = require("../../controllers");

router.get("/", controllers.getAll);

router.get("/:contactId", controllers.getById);

router.post("/", validateMiddleware, controllers.add);

router.delete("/:contactId", controllers.remove);

router.put("/:contactId", validateMiddleware, controllers.update);

module.exports = router;
