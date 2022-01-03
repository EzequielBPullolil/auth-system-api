const {isAlphanumeric,isStrongPassword} = require("validator")

const InvalidUsername = require('src/apiServices/user/exceptions/InvalidUsername');
const InvalidPassword = require('src/apiServices/user/exceptions/InvalidPassword');
module.exports = class UserParamsValidator {
	constructor({username, password}) {
		this.username = username;
		this.password = password;

		this.validateUsername()
		this.validatePassword()
	}

	validateUsername(){
		if(this.username == "") 		   throw new InvalidUsername("empty username")
		if(!isAlphanumeric(this.username)) throw new InvalidUsername("username is not alphanumeric")
	}

	validatePassword(){
		if(!isStrongPassword(this.password, {
			minLength:8,
			minLowercase: 1,
			minUppercase: 1,
			minNumbers: 1
		})) throw new InvalidPassword("weak password")
	}
}
