const { v4: uuid } = require('uuid');
const HttpError = require('../errors/HttpError');
const User = require('../models/User');

async function listUsers (params = {}) {
  const offset = parseInt(params.offset) || 0;
  const limit = parseInt(params.limit) || 10;

  const result = await User.findAndCountAll({
    offset,
    limit,
  })

  const items = []
  for (const row of result.rows) {
    items.push({
      id: row.id,
      name: row.name,
    })
  }

  const total = result.count;

  return {
    items,
    pagination: {
      offset,
      limit,
      total,
    }
  }
}
exports.listUsers = listUsers;

async function getUser (id) {
  const user = await User.findByPk(id);
  if (!user) throw new HttpError(404, 'User not found');

  return {
    id: user.id,
    name: user.name
  }
}
exports.getUser = getUser;

function createUser (input) {
  const name = input?.name;

  if (typeof name !== 'string' || name.length === 0) {
    throw new HttpError(400, 'Name is required');
  }

  const id = uuid()
  User.create({ id, name });
  return {
    location: `/users/${id}`,
  }
}
exports.createUser = createUser;

async function updateUser (id, input) {
  const user = await User.findByPk(id);
  if (!user) throw new HttpError(404, 'User not found');

  if (typeof input.name === 'string') {
    user.name = null;
  }

  await user.save();

  return {
    id: user.id,
    name: user.name,
  }
}
exports.updateUser = updateUser;

async function deleteUser (id) {
  const user = await User.findByPk(id);
  if (!user) throw new HttpError(404, 'User not found');

  await user.destroy();

  return null
}
exports.deleteUser = deleteUser;
