const { AadharDetails,ResidentCredentials } = require('./Schemas');

// resident authentication
const residentAuth = function(phoneNumber,password){
    return ResidentCredentials.findOne({where: {phonenumber: phoneNumber, password: password},
        raw: true, attributes: ['aadhar_number']})   
}

// resident otp 
const getUserNumber = function(phoneNumber){
    return AadharDetails.findOne({where: {phonenumber: phoneNumber},
        raw : true, attributes: { phoneNumber }});    
}

// get residents who linked with a phone number by name and dob
const getResident = function(phoneNumber,name,dob){
    return AadharDetails.findOne({where: {phonenumber: phoneNumber,name: name, 
        dob: dob}, raw : true});    
}

// set resident password 
const setResidentPassword = function(phoneNumber,password,aadharNumber){
    return ResidentCredentials.create({
        phonenumber: phoneNumber, password: password, aadhar_number: aadharNumber
    });
}

// get demographic details of a resident
const getDemographicDetails = function(aadharNumber){
    return AadharDetails.findOne({where: {aadhar_number: aadharNumber}, raw : true});  
}

module.exports = {
    getUserNumber, getResident, getDemographicDetails, setResidentPassword, residentAuth
}

