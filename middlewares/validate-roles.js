const { response } = require("express")



const adminRole = ( req, res=response, next ) => {

  if( !req.user ){
    return res.status(500).json({
      msg: ' You want to validate the role without the token '
    })
  }

  const { role, name } = req.user;

    if(role != 'ADMIN_ROLE') {
      return res.status(401).json({
        msg: `${ name } is not administrator`
      })
    }

  next();
}

const rolesAllowed = (...roles) => {

  return  ( req, res = response, next ) => {
    if( !req.user ){
      return res.status(500).json({
        msg: ' You want to validate the role without the token '
      })
    };
    
    if( !roles.includes( req.user.role ) ) {
      console.log(!roles.includes( req.user.role ))
      return res.status(401).json({
        msg: `Thr services need on of this roles ${roles}`
      })
    }

    next();
  }

}

module.exports = {
  adminRole,
  rolesAllowed
}