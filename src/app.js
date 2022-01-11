
const express = require("express");
const morgan  = require('morgan');

const indexRouter = require('src/routes/index');
const app     = express();

app.use( express.json() );
app.use( express.urlencoded({extended:true}) );
app.use( "/", indexRouter );

module.exports = app;
