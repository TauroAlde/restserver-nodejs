const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


const validateJWT = async( req = request, res = response, next ) => {

  const token = req.header('authorization-token');

  if(!token) {
    return res.status(401).json({
      msg: 'There is no token in the request'
    });
  };

  try {

    const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

    const user = await User.findById( uid );

    if( !user ) {
      return res.status(401).json({
        msg: 'User not exist'
      });
    }

    //verificar si el user esta como true
    if( !user.status ) {
      return res.status(401).json({
        msg: 'This token not is valid'
      });
    };

    req.user = user;

    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Token not valid'
    })
  }

}


module.exports = {
  validateJWT
}