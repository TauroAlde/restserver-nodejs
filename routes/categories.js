const { Router } = require('express');
const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/categories');

const { categoryCreateSchema, categoryUpdateSchema, getCategorySchema, categoryDeleteSchema } = require('../schemes/category')

const router = Router();

//todas las cetegorias
router.get('/', getCategories);

//obtener una categoria de
router.get('/:id', getCategorySchema, getCategory);

//crear una categoria privado solo para personas con token valido
router.post('/', categoryCreateSchema, createCategory);

//actualizar privado solo para personas con token valido
router.put('/:id', categoryUpdateSchema, updateCategory);

//cambiar el estado a false, privado solo para personas con token valido
router.delete('/:id', categoryDeleteSchema, deleteCategory);

module.exports = router;