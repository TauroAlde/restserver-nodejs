const { Router } = require('express');

const {
  userPutchema,
  userCreateSchema,
  userDeleteSchema
} = require('../schemes/user');

const { usersGet,
        createUser,
        putUsers,
        updateUser,
        deleteUsers } = require('../controllers/usuarios');

const router = Router();


router.get('/', usersGet );

router.put('/:id', userPutchema, putUsers );

router.post('/', userCreateSchema, createUser );

router.delete('/:id', userDeleteSchema, deleteUsers );

router.patch('/', updateUser );





module.exports = router;