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
		if(this.username == "") 		    throw new InvalidUsername("empty username")
		if(!isAlphanumeric(this.username))  throw new InvalidUsername("no alphanumeric username")
		if(this.username.length < 8)		throw new InvalidUsername("username length lower than 8")
	}

	validatePassword(){
		const validate = isStrongPassword(this.password, {
			minLength:8,
			minLowercase: 1,
			minUppercase: 1,
			minNumbers: 1,
			minSymbols: 0
		})
		if(!validate)  throw new InvalidPassword("weak password")
	}
}
