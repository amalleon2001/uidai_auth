const express = require('express');
const routes = new express.Router();
const controller = require('../controllers/aadhar_controller');
const { checkRoutes } = require('../controllers/checkroutes');

routes.get('/',checkRoutes, controller.home);

routes.post('/Register', controller.register);

routes.get('/Otp', controller.otp);

routes.post("/Otp", controller.otpVerification);

routes.get('/Resident-Set-Password', controller.residentPasswordPage);

routes.post('/Resident-Set-Password', controller.setResidentPassword);

routes.get('/Kyc',checkRoutes, controller.getKyc);

routes.post('/kyc',checkRoutes, controller.kycVerification)

routes.post('/login',controller.login);

routes.get('/logout',controller.logout)

module.exports = routes;