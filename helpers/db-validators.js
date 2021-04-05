const Role = require('../models/role');
const {User, Category, Product} = require('../models');


const validRole = async(role) => {

    const existRole = await Role.findOne({ role });

    if( !existRole ) {
      throw new Error( `The ${ role } not exist in the DB` );//error custome
    }
  
}

const existEmail = async(email) => {

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

const existCategoryForId = async(id) => {

  const existCategory = await Category.findById( id );

  if(!existCategory) {
    throw new Error( `This ${ id } not exist` );
  }

}

const existNameCategory = async(name) => {


  const exitNameCategory = await Category.findOne( name );

  if(!exitNameCategory) {
    throw new Error( `This ${ name }, already exist` );
  }

}

const existProductForId = async(id) => {

  const existProduct = await Product.findById( id );

  if(!existProduct) {
    throw new Error( `This ${id} not exist`);
  }

}


const collectionPermitted = (collection = '', collections = []) => {

  const incluid = collections.includes(collection);

  if( !incluid ) {
    throw new Error(`The ${collection} not is permitted, onlie this collection are permitted ${collections}`)
  }

  return true;


}


module.exports  = {
  validRole,
  existEmail,
  existUserForId,
  existCategoryForId,
  existNameCategory,
  existProductForId,
  collectionPermitted
}