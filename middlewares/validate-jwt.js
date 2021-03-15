const jwt = require('jsonwebtoken');
const User = require('../models/user');


const validateJWT = async( req, res, next ) => {

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
        msg: 'User does not exist'
      });
    }

    //verificar si el user esta como true
    if( !user.status ) {
      return res.status(401).json({
        msg: 'This token is invalid'
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