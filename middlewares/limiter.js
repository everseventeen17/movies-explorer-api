require('dotenv').config();

const { NODE_ENV } = process.env;
const rateLimit = require('express-rate-limit');

const maxLimit = NODE_ENV === 'production' ? 5 : 25;

module.exports = rateLimit({
  max: maxLimit,
  windowMS: 10000, // 10 seconds
  message: 'Вы привысили лимит запросов, попробуйте снова позже',
});
