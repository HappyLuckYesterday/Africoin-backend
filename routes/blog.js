const { Router } = require('express');
const multer = require("multer");

const { getBlogs, createBlog, getBlogById, updateBlog, deleteBlog } = require("../controllers/blog-controller");
const Blog = require("../models/Blog");

const blogRoutes = (upload) => {
    const router = Router();
    router.get("/list", getBlogs);
    router.post('/', upload.single('image'), createBlog);
    router.get('/:id', getBlogById);
    router.put('/:id', upload.single('image'), updateBlog);
    router.delete('/:id', deleteBlog);
    return router;
}

module.exports = blogRoutes;