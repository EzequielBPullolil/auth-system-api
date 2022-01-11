class WrongPassword extends Error {
	constructor() {
		super("wrong password, try again")
		this.name = "WrongPassword"
	}
}


module.exports = WrongPassword;
