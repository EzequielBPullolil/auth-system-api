const JwtVerify = require("src/apiServices/common/JwtVerify")
const secret = process.env.JWT_SECRET;

module.exports = (req,res,next)=>{
	try{
		const {token} = req.body;
		const decoded = JwtVerify(token, secret);
		req.user = decoded;
	}catch(err){
	 	return res.status(401).send("miss or miss auth token")
	}
	return next();
}
