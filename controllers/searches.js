const { ObjectId } = require('mongoose').Types;
const { User, Category, Product } = require('../models');

const collectionsAlloweds = [

  'users',
  'categories',
  'products',
  'roles'

];

const searchUsers = async(term, res) => {

  const isMOngoID = ObjectId.isValid(term);
  console.log(isMOngoID)

  if(isMOngoID) {
    const user = await User.findById(term);

    return res.json({
      result: (user) ? [user] : []
    })
  }

  const regex = new RegExp(term, 'i');

  const users = await User.find({ 
    $or: [{name: regex}, {email: regex}],
    $and: [{status: true}]
    });//podemos camvuar find por count para saber cuantas respuestas hay
  
  res.json( {
    result: users
  })

}

const searchCategories = async(term, res) => {

  const isMOngoID = ObjectId.isValid(term);

  if(isMOngoID) {
    const category = await Category.findById(term);

    return res.json({
      result: (category) ? [category] : []
    })
  }

  const regex = new RegExp(term, 'i');

  const categories = await Category.find({name: regex, status: true});//podemos camvuar find por count para saber cuantas respuestas hay
  
  res.json( {
    result: categories
  })

}

const searchProducts = async(term, res) => {

  const isMOngoID = ObjectId.isValid(term);
  console.log(isMOngoID)
  if(isMOngoID) {
    const product = await Product.findById(term).populate('category', 'name');;

    return res.json({
      result: (product) ? [product] : []
    })
  }

  const regex = new RegExp(term, 'i');

  const products = await Product.find({name: regex, status: true}).populate('category', 'name');//podemos camvuar find por count para saber cuantas respuestas hay
  
  res.json( {
    result: products
  })

}

const search = (req, res) => {

  const { collection, term } = req.params;

  if( !collectionsAlloweds.includes(collection) ) {
    return res.status(400).json( { 
      msg: ` The collection allowed are ${collectionsAlloweds}`
    })
  }


  switch (collection) {
    case 'users':
      searchUsers(term, res);
    break;
    case 'categories':
      searchCategories(term, res);

    break;
    case 'products':
      searchProducts(term, res);

    break;
    default:
      res.status(500).json({ msg: 'Forget the case search'})
  }

}

module.exports = {
  search
}