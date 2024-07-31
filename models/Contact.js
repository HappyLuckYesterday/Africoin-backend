const mongoose = require("mongoose");

var ContactSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    country: {
      type: String,
    },
    organization: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", ContactSchema);
