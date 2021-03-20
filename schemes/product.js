const { validateFields, validateJWT, adminRole, rolesAllowed } = require('../middlewares');
const { check } = require('express-validator');
const {
  existProductForId,
} = require('../helpers/db-validators');

const productFields = {

  id: check('id','Not is a valid ID').isMongoId(),
  
  idExistProduct: check('id').custom( existProductForId ),

  name: check('name', 'The name is needed').not().isEmpty(),

  category: check('category', 'The is not a mongo id').isMongoId(),

};

const getProductSchema = [
  productFields.id,
  productFields.idExistProduct,
  validateFields
];

const CreateProductSchema = [
  validateJWT,
  productFields.name,
  productFields.category,
  validateFields
];

const updateProductSchema = [
  validateJWT,
  // productFields.category,
  productFields.idExistProduct,
  validateFields
];

const deleteProductSchema = [
  validateJWT,
  adminRole,
  productFields.id,
  productFields.idExistProduct,
  validateFields
];

module.exports = {
  CreateProductSchema,
  getProductSchema,
  updateProductSchema,
  deleteProductSchema
}