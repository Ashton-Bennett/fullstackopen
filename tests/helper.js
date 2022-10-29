const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'This is a fake blog...',
    author: 'Mr. Fake-guy',
    url: 'www.fakethings.com',
    likes: 23,
  },
  {
    title: 'Running',
    author: 'Faster guy',
    url: 'www.fakethings.com',
    likes: 1,
  },

];

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', url: 'www.yeayea.com' });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  nonExistingId,
  usersInDb,
};
