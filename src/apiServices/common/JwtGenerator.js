require('dotenv').config();
const jwt  = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const JwtGenerator = (payload, expiresIn )=>{
	return jwt.sign(payload, secret, expiresIn)
}
module.exports = JwtGenerator;
