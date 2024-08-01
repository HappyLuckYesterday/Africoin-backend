const router = require("express").Router();

const Contact = require("../models/Contact");

router.get(
    "/list",
    async (req, res) => {
        console.log('get contacts')
        try {
            const contacts = await Contact.find({}, { id: 1, first_name: 1, last_name: 1, country: 1, organization: 1, email: 1, phone: 1, message: 1 });
            console.log(contacts);
            res.status(201).json(contacts);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server error: Can not find hotels" });
        }
    }
);

// Create a new contact
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const contact = await Contact.create(req.body);
        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({ error: 'Error creating contact' });
    }
});

// Read a contact
router.get('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching contacts' });
    }
});

// Update a contact
router.put('/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching contacts' });
    }
});

// Delete a contact
router.delete('/:id', async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.status(201).json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting contact' });
    }
});

module.exports = router;