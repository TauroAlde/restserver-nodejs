const { Router } = require('express');

const { userPut, userPost, userDelete } = require('../schemes/user');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id', userPut, usuariosPut );

router.post('/', userPost, usuariosPost );

router.delete('/:id', userDelete, usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;