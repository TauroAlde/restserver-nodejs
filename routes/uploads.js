const { Router } = require('express');

const {uploadFile, updateImg, showImg, updateImgCloudinary} = require('../controllers/uploads',);
const { uploadUpdateSchema, postUploadSchema, getUploadSchema } = require('../schemes/upload');

const router = Router();

router.post('/', postUploadSchema, uploadFile);

router.put('/:collection/:id', uploadUpdateSchema, updateImgCloudinary); //updateImg);

router.get('/:collection/:id', getUploadSchema, showImg);

module.exports = router;