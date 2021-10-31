const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const fs = require('fs');
const { logger } = require('./logger/log');
const aadhar = require('./routes/aadhar_route');
const app = new express();


app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : true}));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
require('dotenv').config();

///// morgan
const routeLogFile = fs.createWriteStream('./logger/routelogs.log',{flags : 'a'});
morgan.token('localDate',function getDate(req) { const date = new Date(); return date.toLocaleString(); });
app.use(morgan(':remote-addr  [:localDate] :method | ":url" | :status | :response-time ms |',{stream : routeLogFile}));


///// ROOT FILE /////
//app.get('/',(req,res) => { res.status(200).render('home') });

app.use('/', aadhar); // AADHAR

app.use((req,res) => { res.status(404).send('Page Not Found') }); // 404 PAGE

const port = process.env.PORT || 4000;
app.listen(port,() => {
    logger.log({ level: 'info', message: 'Server running on port : '+ port });
});

module.exports = app;