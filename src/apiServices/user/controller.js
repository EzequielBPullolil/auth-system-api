const User = require("./user")
const AlreadyTakeUsername = require("./exceptions/AlreadyTakeUsername")
class UserController {
	constructor(userModel) {
		this.model = userModel;
	}
	async createUser(userParams){
		/* create user if username is not already taked */
		if(!userParams) return;
		const {user_id, username, password} = userParams;
		// find user with same name
		const user = await this.model.findOne({
			where:{
				username
			}
		});
		if(user != null) throw new AlreadyTakeUsername();

		const userCreated = await this.model.create({
			user_id:user_id,
			username:username,
			password:password
		});

		return new User(user_id, username, password);
	}
	authUser(userParams){
		return true;
	}
}

module.exports = UserController;
