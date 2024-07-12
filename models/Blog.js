const mongoose = require("mongoose");

var BlogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        body: {
            type: String,
        },
        poster: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        view: {
            type: Number,
            default: 0,
        },
        like: {
            type: Number,
            default: 0,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Blog", BlogSchema);