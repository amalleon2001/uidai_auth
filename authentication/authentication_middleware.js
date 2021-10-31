const JWT = require('jsonwebtoken');

module.exports = {
    generateAccessToken : (user) => {
        return new Promise((resolve,reject) => {
            const payload = { name : user };
            const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
            const options = { expiresIn: '1y', issuer : 'Uidai AAdhar' }
    
            JWT.sign(payload, secretKey,options, (err,token) => {
                if(err) reject(err);
                else resolve(token);
            });
        });
    }
}

