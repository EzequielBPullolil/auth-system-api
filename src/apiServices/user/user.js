const PasswordEncryptManager = require('./class/PasswordEncryptManager');
const UserIdValidator 		 = require('./class/UserIdValidator');
const InvalidUserId			 = require("./exceptions/InvalidUserId");
const MissingUserId			 = require("./exceptions/MissingUserId");

class User {
	#id
	constructor({ user_id, username, password}) {
		if(!user_id) throw new MissingUserId();

		new UserIdValidator(user_id)
		this.#id 	  = user_id;
		this.username = username;
		this.password = password;
		this.encryptManager = new PasswordEncryptManager();
	}

	comparePassword(password){
		/* use PasswordEncryptManager for compare user instance password and param password */
		return this.encryptManager.comparePassword(this.password, password);
	}

	getId(){
		return this.#id;
	}
}

module.exports = User;
