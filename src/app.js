
const express = require("express");
const morgan  = require('morgan');

const indexRouter = require('src/routes/index');
const app     = express();

morgan.token("username", (req)=>{
	if(!req.user) return "NotAuthUser"
	return req.user.username
})
app.use( express.json() );
app.use( express.urlencoded({extended:true}) );
app.use( morgan((tokens,req,res)=>{
	return [
		tokens.method(req,res),
		tokens.url(req,res),
		tokens.status(req,res),
		tokens.res(req, res, 'content-length'), '-',
		tokens['response-time'](req, res), 'ms',
		"user",tokens.username(req)
	].join(" ")
	})
)

app.use( "/", indexRouter );

module.exports = app;
