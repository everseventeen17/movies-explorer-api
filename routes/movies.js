const router = require('express').Router();
const { getMovieByOwnerId, createMovie, deleteMovie } = require('../controllers/movies');
const { createMovieValidator, deleteMovieValidator } = require('../middlewares/movieValidator');

router.get('/', getMovieByOwnerId);
router.post('/', createMovieValidator, createMovie);
router.delete('/:cardId', deleteMovieValidator, deleteMovie);

module.exports = router;
