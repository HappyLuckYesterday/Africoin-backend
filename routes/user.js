const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Url = require("../models/Url");

require("dotenv").config();
const EXPIRE_LIMIT = 15; // min

const { registerValidation } = require("../validation/authValidation");
const { loginValidation } = require("../validation/authValidation");

// Register
router.post("/register", async (req, res) => {
  try {
    // Check if user already exists
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    console.log(req.body);
    let errors = registerValidation(req.body);
    if (Object.keys(errors).length !== 0) {
      console.log(errors);
      return res.status(400).json({ message: errors });
    }

    const newUser = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });

    await newUser.save();
    res.status(201).json({ message: "success", new_user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    let errors = loginValidation(req.body);
    // console.log(errors);
    if (Object.keys(errors).length !== 0) {
      return res.status(400).json({ message: errors });
    }
    // Check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // console.log(user);
    const isMatch = bcrypt.compareSync(req.body.password, user.password);
    // console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // Check if password is correct

    let login_user_role = user.role;
    let urls = await Url.findOne({ role: login_user_role });

    console.log(urls);
    // Create token and send back to client
    const token = jwt.sign(
      { id: user._id, urls: urls.urls, role: login_user_role },
      process.env.JWT_SECRET
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get(
  "/list",
  async (req, res) => {
      console.log('get users')
      try {
          const users = await User.find({}, { id: 1, title: 1, body: 1 });
          console.log(users);
          res.status(201).json(users);
      }
      catch (error) {
          console.error(error);
          res.status(500).json({ error: "Server error: Can not find hotels" });
      }
  }
);

// Create a new user
router.post('/', async (req, res) => {
  try {
      const user = await User.create(req.body);
      console.log('new user: ', user);
      res.status(201).json(user);
  } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
  }
});

// Read a user
router.get('/:id', async (req, res) => {
  try {
      const user = await User.findById(req.params.id);
      res.status(201).json(user);
  } catch (error) {
      res.status(500).json({ error: 'Error fetching users' });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  try {
      const user = await User.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
      );
      res.status(201).json(user);
  } catch (error) {
      res.status(500).json({ error: 'Error fetching users' });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
      await User.findByIdAndDelete(req.params.id);
      res.status(201).json({ message: "User deleted successfully" });
  } catch (error) {
      res.status(500).json({ error: 'Error deleting user' });
  }
});

module.exports = router;
