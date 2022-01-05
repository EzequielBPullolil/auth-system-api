class InvalidUsername extends Error {
	constructor(message) {
		super(message)
		this.name = "InvalidUsername"
	}
}


module.exports = InvalidUsername;
