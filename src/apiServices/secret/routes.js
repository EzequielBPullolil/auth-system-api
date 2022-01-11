require('dotenv').config();
const express = require("express");
const router  = express.Router();
const TokenAuthenticator = require("src/middlewares/TokenAuthenticator")

router.get("/",TokenAuthenticator,(req,res)=>{
	return res.send(`hi user ${req.user.username}`)
})

module.exports = router;
