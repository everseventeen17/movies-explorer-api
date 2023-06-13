const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');

const { loginValidator, createUserValidator } = require('../middlewares/userValidator');
const NotFoundError = require('../utils/NotFoundError');
const { login, createUser, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signin', loginValidator, login);
router.post('/signup', createUserValidator, createUser);
router.use(auth);
router.post('/signout', logout);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.all('*', (req, res, next) => {
  next(new NotFoundError('По указанному адресу ничего не найдено'));
});

module.exports = router;
