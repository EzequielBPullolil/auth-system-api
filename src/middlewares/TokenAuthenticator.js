const JwtVerify = require("src/apiServices/common/JwtVerify")
const secret = process.env.JWT_SECRET;

module.exports = (req,res,next)=>{
	const {toke} = req.body;
	if(!token) return res.status(403).send("need authentication for entry here");
	try{
		const decoded = JwtVerify(token, secret);
		req.user = decoded;
	}catch(err){
		return res.status(401).send("invalid token")
	}

	return next();
}
