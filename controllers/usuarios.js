const { response, request } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { countDocuments } = require('../models/user');
const user = require('../models/user');

const usersGet = async(req , res ) => {

    const { limit = 5, from = 0} = req.query;
    const query = {status: true}

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

const createUser = async(req, res ) => {

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

const putUsers = async(req, res) => {

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

const updateUser = (req, res) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const deleteUsers = async(req, res ) => {

    const {id} = req.params;

    //borrar fisicamente
    //const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, {status: false});


    res.json( user );
}




module.exports = {
    usersGet,
    createUser,
    putUsers,
    updateUser,
    deleteUsers
}