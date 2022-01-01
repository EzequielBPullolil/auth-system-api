const User = require("./user")
const UserController ={};

UserController.createUser = ()=>{
	return new User();
}
UserController.authUser = ()=>{
	return true;
}
module.exports = UserController;
