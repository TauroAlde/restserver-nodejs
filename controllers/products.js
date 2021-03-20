const { Product } = require('../models')

const getProducts = async(req, res) => {

  const { limit = 5, from = 0} = req.query;
  const query = {status: true}

  const [total, product] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
    .populate('user', 'name')
    .skip( Number(from) )
    .limit(Number(limit))
]);

res.json({
    total,
    product
});

};

const getProduct = async(req, res) => {

  const { id } = req.params;

  const product = await Product.findById( id )
  .populate('user', 'name')
  .populate('category', 'name')

  res.json(product);

};

const createProduct = async(req,res) => {


  const { status, user, ...rest } = req.body;

  const productDB = await Product.findOne({ name: rest.name });

  if(productDB){
    return res.status(404).json({ 
      msg: `The Product ${ productDB.name }, already exist`
    });
  };

  const data = {
    ...rest,
    name: rest.name.toUpperCase(),
    user: req.user._id,
  }

  const product = new Product( data );

  await product.save();

  res.status(200).json(product);

};

const updateProduct= async(req, res) => {

  const { id } = req.params;

  const { ...rest } = req.body;

  rest.name = rest.name.toUpperCase();

  const product = await Product.findByIdAndUpdate( id, rest);

  res.json(product);

};

const deleteProduct = async(req, res) => {

  const {id} = req.params;

  const product = await Product.findByIdAndUpdate(id, {status: false});


  res.json( product );

};
module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct

}