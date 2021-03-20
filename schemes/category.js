const { validateFields, validateJWT, adminRole, rolesAllowed } = require('../middlewares');
const { check } = require('express-validator');
const {
  existCategoryForId,
  existNameCategory
} = require('../helpers/db-validators');

const categoryFields = {

  id: check('id','Not is a valid ID').isMongoId(),
  
  idExist: check('id').custom( existCategoryForId ),

  name: check('name', 'The name is needed').not().isEmpty(),
  
  nameExist: check('name').custom( existNameCategory ),

};

const getCategorySchema = [
  categoryFields.id,
  categoryFields.idExist,
  validateFields
];

const categoryCreateSchema = [
  validateJWT,
  categoryFields.name,
  validateFields
];

const categoryUpdateSchema = [
  validateJWT,
  categoryFields.idExist,
  categoryFields.name,
  validateFields
];

const categoryDeleteSchema = [
  validateJWT,
  adminRole,
  categoryFields.id,
  categoryFields.idExist,
  validateFields
];

module.exports = {
  categoryCreateSchema,
  categoryUpdateSchema,
  getCategorySchema,
  categoryDeleteSchema
}