const path = require('path');
const { v4: uuidv4 } = require('uuid');

const upload = (files, validExtension = ['png', 'jpg', 'jpeg', 'gif'], folder='') => {

  return new Promise( (resolve, reject) => {
    const  { file } = files;

    const cutName = file.name.split('.');
  
    const extencion = cutName[cutName.length -1];
  
    if (!validExtension.includes(extencion)) {
      return reject(`the ${extencion} not is valid, onli this extension are valid ${validExtension}`);
    }
  
    const nameTemporary = uuidv4() + '.' + extencion;
    const uploadPath = path.join(__dirname, '../uploads/', folder, nameTemporary);
  
    file.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
     }
  
     resolve(nameTemporary);
    });

  });

}

module.exports = {
  upload
}