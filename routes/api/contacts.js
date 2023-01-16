const express = require("express");

const { schemas } = require("../../models/contacts");

const { auth, validation, isValidId } = require("../../middlewares");

const validateMiddleware = validation(schemas.contactsSchemaJoi);
const validateIdMiddlewareFavorite = validation(
  schemas.updateFavoriteSchemaJoi
);
const router = express.Router();
const { contacts: controllers } = require("../../controllers");

router.get("/", auth, controllers.getAll);

router.get("/:contactId", auth, isValidId, controllers.getById);

router.post("/", auth, validateMiddleware, controllers.add);

router.put(
  "/:contactId",
  auth,
  isValidId,
  validateMiddleware,
  controllers.update
);

router.patch(
  "/:contactId/favorite",
  auth,
  isValidId,
  validateIdMiddlewareFavorite,
  controllers.updateStatusContact
);

router.delete("/:contactId", auth, isValidId, controllers.remove);

module.exports = router;
