const { response, request } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { countDocuments } = require('../models/user');
const user = require('../models/user');

const usuariosGet = async(req = request, res = response) => {

    const { limit = 5, from = 0} = req.query;
    const query = {state: true}

    const [total, user] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip( Number(from) )
        .limit(Number(limit)),
    ]);

    res.json({
        total,
        user
    });
}

const usuariosPost = async(req, res = response) => {


    const { name, email, password, role } = req.body;
    const user = new User( { name, email, password, role } );

    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );
    //guardar BD

    await user.save();

    res.json({
        user
    });
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;

    const { _id, password, google, email, ...rest } = req.body;

    //validar contra db

    if(password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, rest);

    res.json(user);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async(req, res = response) => {

    const {id} = req.params;

    //borrar fisicamente
    //const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, {state: false});


    res.json( user );
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}