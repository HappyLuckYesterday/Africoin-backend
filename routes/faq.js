const router = require("express").Router();

const Faq = require("../models/Faq");

router.get(
    "/list",
    async (req, res) => {
        console.log('get faqs')
        try {
            const faqs = await Faq.find({}, { title: 1, body: 1 });
            console.log(faqs);
            res.status(201).json({ message: "success", faqs: faqs });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server error: Can not find hotels" });
        }
    }
);

// Create a new faq
router.post('/', async (req, res) => {
    try {
        const faq = await Faq.create(req.body);
        res.status(201).json(faq);
    } catch (error) {
        res.status(500).json({ error: 'Error creating faq' });
    }
});

// Read a faq
router.get('/:id', async (req, res) => {
    try {
        const faq = await Faq.findById(req.params.id);
        res.status(201).json(faq);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching faqs' });
    }
});

// Update a faq
router.put('/:id', async (req, res) => {
    try {
        const faq = await Faq.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(201).json(faq);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching faqs' });
    }
});

// Delete a faq
router.delete('/:id', async (req, res) => {
    try {
        await Faq.findByIdAndDelete(req.params.id);
        res.status(201).json({ message: "Faq deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting faq' });
    }
});

module.exports = router;