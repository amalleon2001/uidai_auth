const {verifyAccessToken} = require('../authentication/authorization_middleware');
const { logger } = require('../logger/log');

module.exports = {
    checkRoutes : async function(req,res,next){
        try{
            const accessToken = req.cookies.residentTokenUidai;
            await verifyAccessToken(accessToken);
            next();
        }
        catch(err){
            logger.log({level: 'error', message: err ,label: 'checkRoutes'});
            res.status(401).render('login');
        }
    }
}