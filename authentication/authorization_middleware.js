const JWT = require('jsonwebtoken');
module.exports = {
    verifyAccessToken : (Token) => {
        return new Promise((resolve,reject) => {
            const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
            if(Token)
            {
               JWT.verify(Token, secretKey,(err,payload) => {
                    if(err){  reject(err); }
                    else{ resolve(payload.name); }
               });
            }
            else{
                const error = new Error(); error.name = 'TokenNotFound'; 
                error.message = 'Access Token Not Available.'; reject(error);
            }
        });
    }
}

