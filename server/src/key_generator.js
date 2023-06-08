const { generateKeyPair } = require('crypto');
const filesystem = require('fs');


const generatePairRSA = () => {
  if (filesystem.existsSync('./keys/private_key.pem') || filesystem.existsSync('./keys/public_key.pem')){
    return console.log('A pair of keys already exists');
  }
  generateKeyPair(
    'rsa',
    {      
      // 4096 bits de longitud
      modulusLength: 4096,
      publicKeyEncoding: {
        // stands for 'SubjectPublicKeyInfo'
        // formato estandar de encoding para claves publicas
        type:'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        // stands for 'Public-Key Cryptography Standards #8'
        // formato estandar de encoding para claves privadas
        type:'pkcs8',
        format: 'pem'
      }
    }, 
    // callback function: una vez se ejecuta generateKeyPair;
    // nos quedamos con los siguientes parametros
    (err, public_key, private_key) => {
      if (err) return console.log(err);

      
      filesystem.writeFileSync('./keys/private_key.pem', private_key, 'utf-8');
      
      filesystem.writeFileSync('./keys/public_key.pem', public_key, 'utf-8');  
      
      console.log('RSA key pair succesfully created')
    }
  );
}

generatePairRSA();