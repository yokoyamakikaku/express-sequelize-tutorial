const HttpError = require('../errors/HttpError');

function errorHandler(err, req, res, next) {
  console.error(err);
  if (err instanceof HttpError) {
    return res.status(err.statusCode).send(err.message);
  }
  res.status(500).send('Something went wrong!');
}

module.exports = errorHandler;
