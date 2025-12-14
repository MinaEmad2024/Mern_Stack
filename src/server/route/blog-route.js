
const express = require('express');
const blogRouter = express.Router();

const{fetchListOfBlogs, addNewBlog, updateBlog, deleteBlog} = require('../controller/bog-controller')


blogRouter.get("/", fetchListOfBlogs);

blogRouter.post("/add", addNewBlog);

blogRouter.put("/update/:id", updateBlog);

blogRouter.delete("/delete/:id", deleteBlog);


module.exports = blogRouter;

