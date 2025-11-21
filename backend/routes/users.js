

const router = require('express').Router();
const { protect, admin } = require('../middleware/auth');
const { getUsers } = require('../controllers/userController');


router.get('/users', protect, admin, getUsers);


module.exports = router;
