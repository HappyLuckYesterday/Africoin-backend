const router = require("express").Router();

const Blog = require("../models/Blog");

router.get(
    "/list",
    async (req, res) => {
        console.log('get blogs')
        try {
            const blogs = await Blog.find({}, {});
            console.log(blogs);
            res.status(201).json(blogs);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server error: Can not find hotels" });
        }
    }
);

// Create a new blog
router.post('/', async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Error creating blog' });
    }
});

// Read a blog
router.get('/:id', async (req, res) => {
    console.log("read a blog by id: ", req.params.id);
    try {
        const blog = await Blog.findById(req.params.id);
        console.log("blog by id: ", blog);
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching blogs' });
    }
});

// Update a blog
router.put('/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching blogs' });
    }
});

// Delete a blog
router.delete('/:id', async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.status(201).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting blog' });
    }
});

module.exports = router;