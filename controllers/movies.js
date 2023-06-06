const { CastError, DocumentNotFoundError } = require('mongoose').Error;
const { SUCCESS_CODE } = require('../utils/constants');
const Movie = require('../models/movie');

const ForbiddenError = require('../utils/ForbiddenError');
const NotFoundError = require('../utils/NotFoundError');
const BadRequestError = require('../utils/BadRequestError');

module.exports.getMovieByOwnerId = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .orFail()
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        return next(new NotFoundError('Карточки фильмов пользователя с указанным id не найдены'));
      }
      return next(err);
    });
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration,
    year, image, trailerLink, thumbnail,
    movieId, nameRU, nameEN, description,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    description,
    owner: req.user._id,
  })
    .then((card) => {
      res.status(SUCCESS_CODE).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные для создания карточки фильма'));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        card.deleteOne();
        res.send({ message: 'Фильм успешно удалён' });
      } else {
        throw new ForbiddenError('Вы не можете удалить чужую карточку');
      }
    })
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError('Карточка с указанным id не найдена'));
      } else if (err instanceof CastError) {
        next(new BadRequestError('Передан некорректный id карточки'));
      } else {
        next(err);
      }
    });
};
