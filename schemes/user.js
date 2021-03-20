const { validateFields, validateJWT, adminRole, rolesAllowed } = require('../middlewares');
const { check } = require('express-validator');
const { 
  validRole, 
  existEmail, 
  existUserForId 
} = require('../helpers/db-validators');

// const validationGet = () => {
//   check('id','Not is a valid ID').isMongoId(),
//   check('id').custom( existUserForId ),
//   check('role').custom( validRole ),
//   validateFields
// }

// const valaidtonPost = () => {
//   check('name', 'The name is needed').not().isEmpty(),
//   check('password', 'The password shuld be more than six letters and numbers').isLength({ min: 6 }),
//   check('email', 'This email isnt valid').isEmail(),
//   check('email').custom( existEmail ),
//   check('role').custom( validRole ),//(role) => validRole(role)
//   validateFields
// }

// const validationDelete = () => {
//   validateJWT,
//   //adminRole, -->just admin
//   rolesAllowed('ADMIN_ROLE','SELLERS_ROLE'),//custome
//   check('id','Not is a valid ID').isMongoId(),
//   check('id').custom( existUserForId ),
//   validateFields
// }

const userFields = {

  email: check('email', 'This email isnt valid').isEmail(),

  emailExist: check('email').custom( existEmail ),

  id: check('id','Not is a valid ID').isMongoId(),
  
  idExist: check('id').custom( existUserForId ),

  password: check('password', 'The password shuld be more than six letters and numbers').isLength({ min: 6 }),

  role: check('role').custom( validRole ),

  roleValid: check('role').custom( validRole ),

  name: check('name', 'The name is needed').not().isEmpty(),

};

const userPutchema = [
  userFields.id,
  userFields.idExist,
  userFields.role,
  validateFields
];

const userCreateSchema = [
  userFields.name,
  userFields.password,
  userFields.email,
  userFields.emailExist,
  userFields.role,
  validateFields
];

const userDeleteSchema = [
  validateJWT,
  userFields.id,
  userFields.idExist,
  validateFields
];

module.exports = {
  userPutchema,
  userCreateSchema,
  userDeleteSchema
}