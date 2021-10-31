
const model = require('../models/aadhar_model');
const bcrypt = require('bcrypt');
const {generateAccessToken} = require('../authentication/authentication_middleware');
const { logger } = require('../logger/log');
const QRCode = require('qrcode');

// get otp page
const otp = function(req,res){
    res.status(200).render('otp');
}

// set password
const residentPasswordPage = function(req,res){
    res.status(200).render('setpassword');
}

// get kyc page 
const getKyc = function(req,res){
    res.status(200).render('kyc');
}

// get home page
const home = function(req,res){
    res.status(200).render('home');
}

// user register
const register = function(req,res){
    const { phoneNumber,name,dob } = req.body;
    model.getUserNumber(phoneNumber,name,dob)
    .then(result => {
        if(result == null) throw result;
        res.status(200).cookie('PhoneNumber', phoneNumber).cookie('ResidentName',name)
        .cookie('DOB', dob).redirect('Otp');
    })
    .catch(err => {
        res.status(401).redirect('/');
    }) 
} 

// otp verification
const otpVerification = function(req,res){
    const { otpNumber } = req.body;
    const phoneNumber = req.cookies.PhoneNumber, name = req.cookies.ResidentName, dob = req.cookies.DOB;
    if(otpNumber == '1234'){
        model.getResident(phoneNumber,name,dob).then(result => {
            if(result == null) throw result;
            res.status(201).cookie('AadharNumber', result.aadhar_number).cookie('ResidentName','')
            .cookie('DOB', '').redirect('/Resident-Set-Password');
        }).catch(err => {
            res.status(401).redirect('/Otp');
        })
    }else{
        res.status(401).redirect('/Otp');
    }
}

// user auth 
const login = async function(req,res){
    const { phoneNumber,password } = req.body;
    try
    {
        const resident = await model.residentAuth(phoneNumber,password);
        if(resident)
        {
            const accessToken = await generateAccessToken(resident.aadhar_number);
            logger.log({level : 'info' ,message : 'Login Successfull', label : 'login'});
            res.cookie('residentTokenUidai',accessToken,{ maxAge: 3600000*24*7 })
            .status(201).redirect('/');
        }
        else
        {
            logger.log({level : 'error' ,message : 'Worng username or password', label : 'login'});
            res.status(404).render("login");
        } 
    }
    catch(err){
        logger.log({level : 'error' ,message : err ,label : 'login'});
        res.status(401).render("login");
    }
}

// logout
const logout = function(req,res){
    if(req.cookies.residentTokenUidai){
        logger.log({level: 'info' ,message: 'user logged out' ,label: 'logout'});
        res.cookie('residentTokenUidai','');
    }else{
        logger.log({level: 'error' ,message: 'Token is not available to logout.' ,label: 'logout'});
    }
    res.status(401).redirect('/');
}

// get residents
const setResidentPassword = function(req,res){
    const { password,cpassword } = req.body;
    if(password != cpassword) throw 'Passwords does not match';
    const phoneNumber = req.cookies.PhoneNumber, aadharNumber = req.cookies.AadharNumber
    model.setResidentPassword(phoneNumber,password,aadharNumber)
    .then( async result => {
        const accessToken = await generateAccessToken(aadharNumber);
        res.cookie('residentTokenUidai',accessToken,{ maxAge: 3600000*24*7 }).cookie('AadharNumber','').
        cookie('phoneNumber','').status(201).redirect('/');
    })
    .catch(err => {
        res.status(400).redirect('/Resident-Set-Password');
    })
}

// get demographic deatils of the selected resident
const getDemographicDetails = function(req,res){
    const { aadharNumber } = req.query;
    model.getDemographicDetails(aadharNumber)
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        res.status(400).send(err);
    })
}

// verify kyc
const kycVerification = function(req,res){
    QRCode.toDataURL('KYC').then(qrcode => {
        res.status(201).send(qrcode);
    })
    .catch(err => {
        res.status(401).send(err);
    })
}

module.exports = {
    login, logout, setResidentPassword, getDemographicDetails, home, register, otp,
    residentPasswordPage, otpVerification, getKyc, kycVerification
}