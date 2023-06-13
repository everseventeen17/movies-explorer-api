const { celebrate, Joi } = require('celebrate');

module.exports.createMovieValidator = celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().trim().required(),
    nameEN: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    year: Joi.string().trim().required(),
    country: Joi.string().required().trim(),
    director: Joi.string().trim().required(),
    duration: Joi.number().required(),
    image: Joi.string().required().uri().trim(),
    trailerLink: Joi.string().required().uri().trim(),
    thumbnail: Joi.string().uri().trim().required(),
    movieId: Joi.number().required(),
  }),
});

module.exports.deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});
