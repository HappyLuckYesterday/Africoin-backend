const Blog = require("../models/Blog");

// Get Blog List
const getBlogs = async (req, res) => {
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

// Create a new blog
const createBlog = async (req, res) => {
    try {
        const {title, body, view, like} = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : '';
        console.log('body', req.body);
        console.log({title, body, image, view, like});
        const blog = await Blog.create({title, body, image, view, like});
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Error creating blog' });
    }
};

// Read a blog
const getBlogById = async (req, res) => {
    console.log("read a blog by id: ", req.params.id);
    try {
        const blog = await Blog.findById(req.params.id);
        console.log("blog by id: ", blog);
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching blogs' });
    }
}

// Update a blog
const updateBlog = async (req, res) => {
    try {
        const {title, body, view, like} = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : '';
        console.log('body', body);
        console.log({title, body, image, view, like});
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            {title, body, image, view, like},
            { new: true }
        );
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching blogs' });
    }
};

// Delete a blog
const deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.status(201).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting blog' });
    }
};

module.exports = {getBlogs, getBlogById, createBlog, updateBlog, deleteBlog}