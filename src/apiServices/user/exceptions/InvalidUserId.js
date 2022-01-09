class InvalidUserId extends Error {
	constructor() {
		super("user id are invalid")
		this.name = "InvalidUserId"
	}
}


module.exports = InvalidUserId;
