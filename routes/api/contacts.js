const express = require("express");

const { schemas } = require("../../models/contacts");

const { validation, isValidId } = require("../../middlewares");

const validateMiddleware = validation(schemas.contactsSchemaJoi);
const validateIdMiddlewareFavorite = validation(
  schemas.updateFavoriteSchemaJoi
);
const router = express.Router();
const { contacts: controllers } = require("../../controllers");

router.get("/", controllers.getAll);

router.get("/:contactId", isValidId, controllers.getById);

router.post("/", validateMiddleware, controllers.add);

router.put("/:contactId", isValidId, validateMiddleware, controllers.update);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateIdMiddlewareFavorite,
  controllers.updateStatusContact
);

router.delete("/:contactId", isValidId, controllers.remove);

module.exports = router;
