const JwtGenerator = require("./class/JwtGenerator");
const User = require("./user")
const UserUUID = require("./class/UserUUID")
const AlreadyTakeUsername = require("./exceptions/AlreadyTakeUsername")
const UserParamsValidator = require("./class/UserParamsValidator")
const UsernameNotExist 		= require("src/apiServices/user/exceptions/UsernameNotExist");
class UserController {
	constructor(userModel) {
		this.model = userModel;
	}
	async createUser({user_id, username,password}){
		/* create user if username is not already taked */
		if(!user_id){
			user_id = new UserUUID().value
		}
		new UserParamsValidator({user_id,username,password});
		// find user with same name
		const user = await this.model.findOne({
			where:{
				username:`${username}%`
			}
		})
		if(user != null) throw new AlreadyTakeUsername();

		const userCreated = await this.model.create({
			user_id:user_id,
			username:username,
			password:password
		});

		return new User({user_id, username, password});
	}
	async authUser(userParams){
		const {username, password} = userParams;
		const user = await this.model.findOne({
			where:{
				username:`${username}%`,
				password:`${password}%`
			}
		});
		if(user == null) throw new UsernameNotExist()


	  	return JwtGenerator({
			user_id: user.user_id,
			username: user.username
		})
	}
}

module.exports = UserController;
