const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 });
    // response.end(JSON.stringify(blogs,null,10))
  return response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const { body } = request;

  if (!request.token) {
    return response.status(401).json({ error: 'token missing' });
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid' });
  }

  const { user } = request;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user,
  });
  console.log('+++++++', user, blog);
  if (blog.title === undefined || blog.url === undefined) {
    return response.status(400).json();
  }
  if (user === null) {
    return response.status(401).json({ error: 'user id is invalid' });
  }

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  return response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  const blog = await Blog.findById(request.params.id);
  const userid = request.user.id;

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  if (blog.user.toString() !== userid.toString()) {
    return response.status(403).json({ error: 'wrong user' });
  }

  await Blog.findByIdAndRemove(request.params.id);

  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const personToUpdate = await Blog.findById(request.params.id);
  const updatedAmount = personToUpdate.likes + 1;

  const blog = {
    likes: updatedAmount,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });

  response.json(updatedBlog);
});
module.exports = blogsRouter;
