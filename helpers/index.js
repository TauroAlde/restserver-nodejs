const dbValidator = require('./db-validators');
const generateJWT = require('./generate-jwt');
const upload      = require('./uploads');

module.exports = {
  ...dbValidator,
  ...generateJWT,
  ...upload
}