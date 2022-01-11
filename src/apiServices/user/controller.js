const JwtGenerator = require("src/apiServices/common/JwtGenerator");
const User = require("./user")
const UserUUID = require("./class/UserUUID")
const UserParamsValidator = require("./class/UserParamsValidator")
const WrongPassword		  = require("./exceptions/WrongPassword")
const AlreadyTakeUsername = require("./exceptions/AlreadyTakeUsername")
const UsernameNotExist 	  = require("src/apiServices/user/exceptions/UsernameNotExist");
class UserController {
	constructor(userModel) {
		this.model = userModel;
	}
	async createUser({user_id, username,password}){
		/* create user if username is not already taked */
		if(!user_id){
			user_id = new UserUUID().value
		}
		new UserParamsValidator({username,password});
		// find user with same name
		const user = await this.model.findOneByUsername(username);
		if(user != null) throw new AlreadyTakeUsername();
		const userCreated = await this.model.create({
			user_id:user_id,
			username:username,
			password:password
		});

		return new User({user_id, username, password});
	}
	async authUser(userParams){
		let {username, password} = userParams;
		const user = await this.model.findOneByUsername(username)
		if(user == null) throw new UsernameNotExist()

		if(! user.comparePassword(password)) throw new WrongPassword();

	  	return JwtGenerator({
			user_id:user.getId(),
			username:user.username
		})
	}
}

module.exports = UserController;
