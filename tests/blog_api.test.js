const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./helper');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);
const bcrypt = require('bcrypt');
const User = require('../models/user');

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

describe('read tests', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
});

describe('create tests', () => {
  test('check for token', async () => {
    const badId = {
      title: 'Id woman',
      author: 'Miss fakeass',
      url: 'www.fakethings.com',
      likes: 900,
      user: '635d33d56ca2ac75f3efa528',
    };

    await api
      .post('/api/blogs')
      .send(badId)
    // .set('Authorization','bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFzaHRvbl9iZW5uZXR0ODAxIiwiaWQiOiI2MzVkMzNkNTZjYTJhYzc1ZjNlZmE1MjgiLCJpYXQiOjE2NjcwNTI1MjAsImV4cCI6MTY2NzA1NjEyMH0.f3umpoEtfULSGwnhENq7fB3XIdVemAEZW937hUD1HQs')
      .expect(401);

    // const response = await api.get('/api/blogs')
    // console.log(response)
    // expect(response.body).toHaveLength(helper.initialBlogs.length)
  });

  test('blogs have id', async () => {
    const badId = {
      title: 'Id woman',
      author: 'Miss fakeass',
      url: 'www.fakethings.com',
      likes: 900,
    };

    await api
      .post('/api/blogs')
      .send(badId);

    const response = await api.get('/api/blogs');

    response.body.map((blog) => expect(blog.id).toBeDefined());
  });

  test('no title or url... you are getting a 400 for ya bad self', async () => {
    const badRequest = {
      author: 'Mr. Fake-guy',
      likes: 66,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFzaHRvbl9iZW5uZXR0ODAxIiwiaWQiOiI2MzVkNTFkMDkzZDJlY2ZhZjg1ZmZjMDciLCJpYXQiOjE2NjcwNjQwMjB9.8gUAYNxK5tv_MBneCHevAg3PXakxanX-OcqUB7FLuaM')
      .send(badRequest)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('likes are aleast 0', async () => {
    const testBlog = {
      title: 'Adding a new blog',
      author: 'Mr. Fake-guy',
      url: 'www.fakethings.com',
    };

    await api
      .post('/api/blogs')
      .send(testBlog);

    const response = await api.get('/api/blogs');

    response.body.map((blog) => expect(blog.likes).toBeDefined());
  });

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Adding a new blog',
      author: 'Mr. Fake-guy',
      url: 'www.fakethings.com',
      likes: 66,
      user: '635d64e0f97f555e30de26fd',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFzaHRvbl9iZW5uZXR0ODAxIiwiaWQiOiI2MzVkNTFkMDkzZDJlY2ZhZjg1ZmZjMDciLCJpYXQiOjE2NjcwNjQwMjB9.8gUAYNxK5tv_MBneCHevAg3PXakxanX-OcqUB7FLuaM')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    const contents = response.body.map((r) => r.title);

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(contents).toContainEqual(
      'Adding a new blog',
    );
  });
  describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({});

      const passwordHash = await bcrypt.hash('sekret', 10);
      const user = new User({ username: 'root', passwordHash });

      await user.save();
    });

    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

      const usernames = usersAtEnd.map((u) => u.username);
      expect(usernames).toContain(newUser.username);
    });

    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(result.body.error).toContain('username must be unique');

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toEqual(usersAtStart);
    });

    test('creation fails when name less than 3', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'ro',
        name: 'Superuser',
        password: 'salainen',
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(result.body.error).toContain('username must be longer than 3 characters');

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toEqual(usersAtStart);
    });

    test('creation fails when password less than 3', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'roman',
        name: 'Superuser',
        password: 'sa',
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(result.body.error).toContain('password must be longer than 3 characters');

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toEqual(usersAtStart);
    });
  });
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const allBlogs = await api.get('/api/blogs');
    const blogToDelete = allBlogs._body[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFzaHRvbl9iZW5uZXR0ODAxIiwiaWQiOiI2MzVkNTFkMDkzZDJlY2ZhZjg1ZmZjMDciLCJpYXQiOjE2NjcwNjQwMjB9.8gUAYNxK5tv_MBneCHevAg3PXakxanX-OcqUB7FLuaM')
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1,
    );

    const titles = blogsAtEnd.map((r) => r.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('update blogs', () => {
  test('increase number of likes', async () => {
    const allBlogs = await api.get('/api/blogs');
    const blogToUpdate = allBlogs._body[0];
    const originalLikes = blogToUpdate.likes;

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .expect(200);

    expect(blogToUpdate.likes > originalLikes);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
