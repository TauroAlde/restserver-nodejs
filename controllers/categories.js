const { Category } = require('../models')

const getCategories = async(req, res) => {

  const { limit = 5, from = 0} = req.query;
  const query = {status: true}

  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
    .populate('user', 'name')
    .skip( Number(from) )
    .limit(Number(limit))
]);

res.json({
    total,
    categories
});

};

const getCategory = async(req, res) => {

  const { id } = req.params;

  const category = await Category.findById( id )
  .populate('user', 'name')

  res.json(category);

};

const createCategory = async(req,res) => {

  const name = req.body.name.toUpperCase();

  const categoryDB = await Category.findOne({ name });

  if(categoryDB){
    return res.status(404).json({ 
      msg: `The category ${ categoryDB.name }, already exist`
    });
  };

  const data = {
    name,
    user: req.user._id
  }

  const category = new Category( data );

  await category.save();

  res.json(category);

};

const updateCategory = async(req, res) => {

  const { id } = req.params;

  const { ...rest } = req.body;

  rest.name = rest.name.toUpperCase();

  const category = await Category.findByIdAndUpdate( id, rest);

  res.json(category);

};

const deleteCategory = async(req, res) => {

  const {id} = req.params;

  const category = await Category.findByIdAndUpdate(id, {status: false});


  res.json( category );

};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory
}