const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  role: {
    type: Number,
  },
  urls: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Url", UrlSchema);
