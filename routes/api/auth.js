const express = require("express");

const { schemas } = require("../../models/user");

const { validation, auth } = require("../../middlewares");
//auth - перевірка токена на валідність

const validateREgisterMiddleware = validation(schemas.userRegisterSchemaJoi);
const validateLoginMiddleware = validation(schemas.userLoginSchemaJoi);
const validateIdMiddlewareSubscription= validation(
  schemas.userSubscriptionSchemaJoi
);
const router = express.Router();
const { auth: controllers } = require("../../controllers");

router.post("/register", validateREgisterMiddleware, controllers.register);
router.post("/login", validateLoginMiddleware, controllers.login);

router.get("/current", auth, controllers.getCurrent);
router.post("/logout", auth, controllers.logout);

router.patch("/", auth, validateIdMiddlewareSubscription, controllers.updateSubscription)

module.exports = router;
