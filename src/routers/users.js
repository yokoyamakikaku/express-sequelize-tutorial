const express = require('express');
const { createUser, getUser } = require('../usecases/users');
const HttpError = require('../errors/HttpError')
const usersRouter = express.Router();

usersRouter.get('/', (req, res) => {
  res.json({
    items: []
  });
});

usersRouter.post('/', (req, res) => {
  const input = req.body;

  if (!input.name) throw new HttpError(400, 'Name is required');

  const result = createUser(input);

  res
    .status(201)
    .header('Location', result.location)
    .send();
});

usersRouter.get('/:id', (req, res) => {
  const user = getUser(req.params.id);
  if (!user) throw new HttpError(404, 'User not found');
  res.json(user);
});

module.exports = usersRouter;
