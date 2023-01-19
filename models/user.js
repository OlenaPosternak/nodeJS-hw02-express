const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: [6, "Password should be at least 6 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
    },
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

const userRegisterSchemaJoi = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
});

const userVerifyEmailJoi = Joi.object({
    email: Joi.string().required(),
  });


const userLoginSchemaJoi = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const userSubscriptionSchemaJoi = Joi.object({
  subscription: Joi.string().required().valid("starter", "pro", "business"),
});

const schemas = {
  userRegisterSchemaJoi,
  userLoginSchemaJoi,
  userSubscriptionSchemaJoi,
  userVerifyEmailJoi,
};

module.exports = {
  User,
  schemas,
};
