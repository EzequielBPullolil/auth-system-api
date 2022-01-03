class InvalidPassword extends Error {
	constructor(message) {
		super(message)
		this.name = "InvalidPassword"
	}
}


module.exports = InvalidPassword;
