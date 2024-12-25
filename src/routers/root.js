const express = require('express');
const { getHealth } = require('../usecases/health');

const rootRouter = express.Router();

rootRouter.get('/', (req, res) => {
  const health = getHealth();
  res.json(health);
});

module.exports = rootRouter;
