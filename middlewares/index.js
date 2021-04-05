const validateFields         = require('../middlewares/validate-felds');
const validateJWT            = require('../middlewares/validate-jwt');
const validateRoles          = require('../middlewares/validate-roles');
const validateFile = require('./validate-file');

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...validateRoles,
  ...validateFile,
}