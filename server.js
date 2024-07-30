const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

console.log(process.env.MONGO_URI);
mongoose
    .connect(
        process.env.MONGO_URI
    )
    .then(() => {
        console.log("Mongo DB connected !!!");
    });

const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");
const faqRoutes = require("./routes/faq");
const contactRoutes = require("./routes/contact");

app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/faq", faqRoutes);
app.use("/api/contact", contactRoutes);

// Catch-all route to return the front-end app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

app.listen(port, () => {
    console.log(`Express server running at http://localhost:${port}/`);
});

module.exports = app;