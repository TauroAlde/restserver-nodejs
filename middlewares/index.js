const validateFields = require('../middlewares/validate-felds');
const validateJWT = require('../middlewares/validate-jwt');
const validateRoles = require('../middlewares/validate-roles');

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...validateRoles
}