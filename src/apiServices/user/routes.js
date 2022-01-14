const express = require("express");
const router  = express.Router();
const {sequelize} = require('src/services/sequelize/index');

const RequestLimiter = require("src/middlewares/RequestLimiter")
const UserController = require("./controller");
const UserModel 	 = require("./class/UserModel")
const userModel      = new UserModel(sequelize);
const userController = new UserController( userModel );
router.get("/", async (req,res)=>{
	try{
		const {username, password} = req.body;
		if( username == undefined || username == "" ) return res.status(400).json( {error: "need a username"} )
		if( password == undefined || password == "" ) return res.status(400).json( {error: "need a password"} )

		const userAuth = await userController.authUser({
			username,
			password
		});

		return res.json({token:userAuth})
	}catch(err){
		return res.json({
			error: err.name,
			description: err.message
		}).status(400)
	}

})
router.post("/", RequestLimiter, async(req,res)=>{
	try{
		const {username, password} = req.body;
		if( username == undefined || username == "" ) return res.status(400).json( {error: "need a username"} )
		if( password == undefined || password == "" ) return res.status(400).json( {error: "need a password"} )

		const userCreated = await userController.createUser({
			username,
			password
		})

		return res.json({
			username: userCreated.username
		}).status(201);
	}catch(err){
		return res.json({
			error: err.name,
			description: err.message
		}).status(400)
	}
})

module.exports = router;
