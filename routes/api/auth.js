const express = require("express");

const { schemas } = require("../../models/user");

const { validation, auth, upload } = require("../../middlewares");
//auth - перевірка токена на валідність

const validateREgisterMiddleware = validation(schemas.userRegisterSchemaJoi);
const validateLoginMiddleware = validation(schemas.userLoginSchemaJoi);
const validateIdMiddlewareSubscription= validation(
  schemas.userSubscriptionSchemaJoi
);

const verifyEmailMiddleware = validation(schemas.userVerifyEmailJoi)
const router = express.Router();
const { auth: controllers } = require("../../controllers");

router.post("/register", validateREgisterMiddleware, controllers.register);
router.get("verify/:verificationToken", controllers.verifyEmail);
router.post("verify", verifyEmailMiddleware, controllers.resendVerifyEmail);

router.post("/login", validateLoginMiddleware, controllers.login);

router.get("/current", auth, controllers.getCurrent);
router.post("/logout", auth, controllers.logout);

router.patch("/", auth, validateIdMiddlewareSubscription, controllers.updateSubscription)

router.patch("/avatars",auth, upload.single("avatar"), controllers.updateAvatar)

module.exports = router;
