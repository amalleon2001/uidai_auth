
const loginModel = require('../models/login_model');
const bcrypt = require('bcrypt');
const {generateAccessToken} = require('../authentication/authentication_middleware');
const { logger } = require('../logger/log');

// user auth 
const login = async function(req,res){
    
    const { userName,passWord } = req.body;
    try
    {
        const flag = await loginModel.getUser(userName);
        if(flag && (await bcrypt.compare(passWord,flag.password)))
        {
            const accessToken = await generateAccessToken(userName);
            logger.log({level : 'info' ,message : 'Login Successfull', label : 'login'});
            res.cookie('StockManagementAccessToken',accessToken,{ maxAge: 3600000*24*7 })
            .cookie('User',userName,{ maxAge: 3600000*24*7 }).status(201).redirect('/products');
        }
        else
        {
            logger.log({level : 'error' ,message : 'Worng username or password', label : 'login'});
            res.status(404).render('login',{message:"Username or password incorrect"});
        } 
    }
    catch(err){
        logger.log({level : 'error' ,message : err ,label : 'login'});
        res.status(401).render('login',{message:""});
    }
}

// logout
const logout = function(req,res){
    if(req.cookies.StockManagementAccessToken){
        logger.log({level: 'info' ,message: 'user logged out' ,label: 'logout'});
        res.cookie('StockManagementAccessToken','');
    }else{
        logger.log({level: 'error' ,message: 'Token is not available to logout.' ,label: 'logout'});
    }
    res.status(401).redirect('/');
}

module.exports = {
    login, logout
}