const Role = require('../models/role');
const User = require('../models/user');

const validRole = async(role = '') => {

    const existRole = await Role.findOne({ role });

    if( !existRole ) {
      throw new Error( `The ${ role } not exist in the DB` );//error custome
    }
  
}

const existEmail = async(email='') => {

    const existEmail = await User.findOne({ email });

    if(existEmail) {
          throw new Error( `This ${ email } already exist` );
    };

};

const existUserForId = async(id) => {

  const existUser = await User.findById( id );

  if(!existUser) {
        throw new Error( `This ${ id } not exist` );
  };

};

module.exports  = {
  validRole,
  existEmail,
  existUserForId
}