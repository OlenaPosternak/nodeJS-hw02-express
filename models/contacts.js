const { Schema, model, MongooseError } = require("mongoose");
const Joi = require("joi");

const contactsSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      unique: [true, "Contact with current name already exists"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "Set phone number for contact"],
      // match: /^(\d{3}) \d{3}-\d{4}$/,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const hadlerError = (error, data, next) => {
  const { name, code } = error;
  if (name === "MongoServerError" && code === 11000) {
    error.status = 409;
  } else {
    error.status = 400;
  }
  next();
};

contactsSchema.post("save", hadlerError);

const Contact = model("contact", contactsSchema);

const contactsSchemaJoi = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchemaJoi = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  contactsSchemaJoi,
  updateFavoriteSchemaJoi
};

module.exports = {
  Contact,
  schemas,
};
