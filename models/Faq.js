const mongoose = require("mongoose");

var FaqSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        body: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Faq", FaqSchema);