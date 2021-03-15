const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const { response } = require("express");
const { generateJWT } = require("../helpers/generate-jwt");


const login = async(req, res = response) => {

  const { email, password } = req.body;

  try {
    //email ezxite?

    const user = await User.findOne({email});
    if(!user) {
      return res.status(400).json({
        msg: 'There are not correct-email'
      });
    }
    //el usuario esta activo en la bd?
    
    if(!user.status) {
      return res.status(400).json({
        msg: 'There are not correct status: false'
      });
    }
    //verificar la contraseña
    const validPassword = bcryptjs.compareSync( password, user.password );
    if(!validPassword) {
      return res.status(400).json({
        msg: 'There are not correct password'
      });
    }

    //generara jwt
      const token = await generateJWT(user.id)

    res.json({
      user,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'somthing wrong'
    })
    
  }


}


module.exports = {
  login
}