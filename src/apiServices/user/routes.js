const express = require("express");
const router  = express.Router();
const UserController = require("./controller");
const {userModel} = require("src/services/sequelize/index")
const userController = new UserController( userModel );
router.get("/", async (req,res)=>{
	const {username, password} = req.body;
	// TODO: Make class for this process
	if( username == undefined || username == "" ) return res.status(400).json( {error: "need a username"} )
	if( password == undefined || password == "" ) return res.status(400).json( {error: "need a password"} )

	// TODO: Make class for verify user exist
	const userAuth = await userController.authUser({username, password});

	return userAuth ? res.send("ok") : res.send("fail")
})
router.post("/", async(req,res)=>{
	const {username, password} = req.body;
	if( username == undefined || username == "" ) return res.status(400).json( {error: "need a username"} )
	if( password == undefined || password == "" ) return res.status(400).json( {error: "need a password"} )

	const userCreated = await userController.create({
		username,
		password
	})

	return res.json(userCreated).status(200);
})

module.exports = router;
