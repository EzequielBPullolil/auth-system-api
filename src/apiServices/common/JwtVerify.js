require('dotenv').config();
const jwt  = require('jsonwebtoken');
const JwtVerify = (token, secret )=>{
	return jwt.verify(token, secret)
}
module.exports = JwtVerify;
