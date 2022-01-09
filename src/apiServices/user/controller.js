const User = require("./user")
const AlreadyTakeUsername = require("./exceptions/AlreadyTakeUsername")
const UserParamsValidator = require("./class/UserParamsValidator")
const UsernameNotExist 		= require("src/apiServices/user/exceptions/UsernameNotExist");
class UserController {
	constructor(userModel) {
		this.model = userModel;
	}
	async createUser(userParams){
		/* create user if username is not already taked */
		if(!userParams) return;
		new UserParamsValidator(userParams)
		const {user_id, username, password} = userParams;
		// find user with same name
		const user = await this.model.findOne({
			where:{
				username
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
				username,
				password
			}
		});
		if(user == null) throw new UsernameNotExist()
		return user != null;
	}
}

module.exports = UserController;
