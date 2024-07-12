const router = require("express").Router();

const Contact = require("../models/Contact");

// Create a new contact
router.post('/', async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({ error: 'Error creating blog' });
    }
});

module.exports = router;