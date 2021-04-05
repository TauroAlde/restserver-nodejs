const { validateFields, validateJWT, adminRole, rolesAllowed, validateFile } = require('../middlewares');
const { check } = require('express-validator');
const { collectionPermitted } = require('../helpers');

const uploadFields = {

  id: check('id','Not is a valid ID').isMongoId(),

  collection: check('collection').custom( c => collectionPermitted(c, ['users','products']) ),

};

const uploadUpdateSchema = [
  validateFile,
  uploadFields.id,
  uploadFields.collection,
  validateFields
];

const postUploadSchema = [
  validateFile
];

const getUploadSchema = [
  uploadFields.id,
  uploadFields.collection,
  validateFields
];

module.exports = {
  uploadUpdateSchema,
  postUploadSchema,
  getUploadSchema
}