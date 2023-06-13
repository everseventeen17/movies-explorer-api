const router = require('express').Router();

const { updateUserInfoValidator } = require('../middlewares/userValidator');
const { getUserInfo, updateUserInfo } = require('../controllers/users');

router.get('/me', getUserInfo);
router.patch('/me', updateUserInfoValidator, updateUserInfo);
module.exports = router;
