const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1 });
  response.end(JSON.stringify(users, null, 10));
});
// TO MAKE THE CONTACTS SPREAD OUT USE -> response.end(JSON.stringify(persons,null,10))
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique',
    });
  }

  if (username.length < 3) {
    return response.status(400).json({
      error: 'username must be longer than 3 characters',
    });
  }

  if (password.length < 3) {
    return response.status(400).json({
      error: 'password must be longer than 3 characters',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
