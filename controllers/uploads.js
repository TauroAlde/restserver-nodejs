const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const {upload} = require('../helpers')
const {User, Product} = require('../models')

const uploadFile = async(req, res) => {

  try {
    //const name = await up-load(req.files, ['txt', 'md'], 'text');
    const name = await upload(req.files, undefined, 'img');
    res.json({ name });
  } catch (error) {
    res.status(400).json({error})
  }
}

//updateImg is desable
const updateImg = async(req, res) => {

  const { id, collection } = req.params

  let modelo;

  switch (collection) {
    case 'users':
      modelo = await User.findById(id);
      if(!modelo) {
        return res.status(404).json({
          msg: `Not exist user with ${id}`
        })
      }
      break;

    case 'products':
      modelo = await Product.findById(id);
      if(!modelo) {
        return res.status(404).json({
          msg: `Not exist product with ${id}`
        });
      };
      break;
  
    default:
     return res.status(500).json({ msg: 'se me olvido validad esto' })
  }

  //clean img previous
  if(modelo.img){
    //delete img from server
    const pathImg = path.join( __dirname, '../uploads', collection, modelo.img );
    if( fs.existsSync( pathImg ) ) {
      fs.unlinkSync( pathImg );
    }
  }

  const name = await upload(req.files, undefined, collection);
  modelo.img = name;
  await modelo.save();
  res.json({ modelo });

}

const updateImgCloudinary = async(req, res) => {

  const { id, collection } = req.params

  let modelo;

  switch (collection) {
    case 'users':
      modelo = await User.findById(id);
      if(!modelo) {
        return res.status(404).json({
          msg: `Not exist user with ${id}`
        })
      }
      break;

    case 'products':
      modelo = await Product.findById(id);
      if(!modelo) {
        return res.status(404).json({
          msg: `Not exist product with ${id}`
        });
      };
      break;
  
    default:
     return res.status(500).json({ msg: 'se me olvido validad esto' })
  }

  //clean img previous
  if(modelo.img){
    const name_secure_url = modelo.img.split('/');
    const name = name_secure_url[name_secure_url.length -1];
    const [ public_id ] = name.split('.');
    cloudinary.uploader.destroy( public_id );
  }

  const { tempFilePath } = req.files.file;
  const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

  modelo.img = secure_url;

  await modelo.save();

  res.json( modelo );

}

const showImg = async(req, res) => {

  const { id, collection } = req.params

  let modelo;

  switch (collection) {
    case 'users':
      modelo = await User.findById(id);
      if(!modelo) {
        return res.status(404).json({
          msg: `Not exist user with ${id}`
        })
      }
      break;

    case 'products':
      modelo = await Product.findById(id);
      if(!modelo) {
        return res.status(404).json({
          msg: `Not exist product with ${id}`
        });
      };
      break;
  
    default:
     return res.status(500).json({ msg: 'se me olvido validad esto' })
  }

  //clean img previous
  if(modelo.img){
    //delete img from server
    const pathImg = path.join( __dirname, '../uploads', collection, modelo.img );
    if( fs.existsSync( pathImg ) ) {
      return res.sendFile( pathImg );
    }
  }

  const pathImgNotFound = path.join( __dirname, '../assets/no-image.jpg' );

  res.sendFile( pathImgNotFound );

}

module.exports = {
  uploadFile,
  updateImg,
  showImg,
  updateImgCloudinary
}