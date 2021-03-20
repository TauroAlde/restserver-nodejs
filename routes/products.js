const { Router } = require('express');
const { 
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
 } = require('../controllers/products');

const { getProductSchema, CreateProductSchema, updateProductSchema, deleteProductSchema } = require('../schemes/product')

const router = Router();

//todas las cetegorias
router.get('/', getProducts);

//obtener una categoria de
router.get('/:id', getProductSchema, getProduct);

//crear una categoria privado solo para personas con token valido
router.post('/', CreateProductSchema, createProduct);

//actualizar privado solo para personas con token valido
router.put('/:id', updateProductSchema, updateProduct);

//cambiar el estado a false, privado solo para personas con token valido
router.delete('/:id', deleteProductSchema, deleteProduct);

module.exports = router;