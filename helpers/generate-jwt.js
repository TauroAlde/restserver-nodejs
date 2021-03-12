const jwt = require('jsonwebtoken');

const generateJWT = ( uid = '' ) => {

  return new Promise( (resolve, reject) => {

    const payload = { uid };

    jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
      expiresIn: '4h'
    }, (err, token) => {
      if(err) {
        console.log(err);
        reject( 'he token could not be created' );
      } else {
        resolve( token );
      }
    } )

  });
};

module.exports = {
  generateJWT
}