
const Sequelize = require('sequelize');
const { logger } = require('../logger/log');

const sequelize = new Sequelize('uidai_authentication', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
  logger.log({ level: 'info', message: 'Connected Successfully', label : 'Database'});
}).catch(err => {
  logger.log({ level: 'error', message: err, label : 'Database'});
});

module.exports = sequelize;