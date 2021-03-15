const { Router } = require('express');

const { userPut, userPost, userDelete } = require('../schemes/user');

const { getUsers,
        postUsers,
        putUsers,
        patchUsers,
        deleteUsers } = require('../controllers/usuarios');

const router = Router();


router.get('/', getUsers );

router.put('/:id', userPut, putUsers );

router.post('/', userPost, postUsers );

router.delete('/:id', userDelete, deleteUsers );

router.patch('/', patchUsers );





module.exports = router;