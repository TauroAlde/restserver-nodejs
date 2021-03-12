const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT, adminRole, rolesAllowed } = require('../middlewares');

const { 
        validRole, 
        existEmail, 
        existUserForId 
      } = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id',[
  check('id','Not is a valid ID').isMongoId(),
  check('id').custom( existUserForId ),
  check('role').custom( validRole ),
  validateFields
], usuariosPut );

router.post('/',[
  check('name', 'The name is needed').not().isEmpty(),
  check('password', 'The password shuld be more than six letters and numbers').isLength({ min: 6 }),
  check('email', 'This email isnt valid').isEmail(),
  check('email').custom( existEmail ),
  check('role').custom( validRole ),//(role) => validRole(role)
  validateFields
] , usuariosPost );

router.delete('/:id',[
  validateJWT,
  //adminRole, -->just admin
  rolesAllowed('ADMIN_ROLE','SELLERS_ROLE'),//custome
  check('id','Not is a valid ID').isMongoId(),
  check('id').custom( existUserForId ),
  validateFields
], usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;