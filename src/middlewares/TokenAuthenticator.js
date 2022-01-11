const JwtVerify = require("src/apiServices/common/JwtVerify")
const secret = process.env.JWT_SECRET;

module.exports = (req,res,next)=>{
	if(!req.body) return res.status(403).send("need authentication for entry here");
	const {token} = req.body;
	try{
		const decoded = JwtVerify(token, secret);
		req.user = decoded;
	}catch(err){
		return res.status(401).send(err)
	}

	return next();
}
