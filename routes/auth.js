const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-felds');
const { login } = require('../controllers/auth');

const router = Router();

router.post('/login', [
  check('email', 'The email is needed').isEmail(),
  check('password', 'The password is needed').not().isEmpty(),
  validateFields
] , login);

module.exports = router;