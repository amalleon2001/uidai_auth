const Sequelize = require('sequelize');
const sequelize_conn = require('./db_connection');

// Aadhar details database model
const AadharDetails = sequelize_conn.define('aadhar_details', {
    aadhar_number:{ type: Sequelize.STRING(12),allowNull:false, primaryKey:true},
    name:{ type:Sequelize.STRING(50),allowNull:false},
    dob:{ type:Sequelize.STRING(12),allowNull:false},
    phonenumber:{ type:Sequelize.STRING(15),allowNull:false},
    address:{type:Sequelize.STRING(100),allowNull:false }},
    { createdAt: false, updatedAt: false, freezeTableName: true
});

// Resident credentials
const ResidentCredentials = sequelize_conn.define('resident_credentials', {
    aadhar_number:{ type: Sequelize.STRING(12),allowNull:false},
    phonenumber:{ type:Sequelize.STRING(15),allowNull:false, primaryKey:true},
    password:{type:Sequelize.STRING(100),allowNull:false, primaryKey:true }},
    { createdAt: false, updatedAt: false, freezeTableName: true
});

module.exports = { AadharDetails, ResidentCredentials }