const { SERVER_ERROR_CODE } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || SERVER_ERROR_CODE;
  const message = statusCode === SERVER_ERROR_CODE ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  return next();
};
