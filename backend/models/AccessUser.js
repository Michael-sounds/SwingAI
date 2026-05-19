const mongoose =
  require("mongoose");

const accessUserSchema =
  new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },

    accessCode: {
      type: String,
      required: true,
    },

    active: {
      type: Boolean,
      default: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  });

module.exports =
  mongoose.model(
    "AccessUser",
    accessUserSchema
  );