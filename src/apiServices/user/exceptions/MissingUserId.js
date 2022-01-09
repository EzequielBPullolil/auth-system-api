class MissingUserId extends Error {
	constructor() {
		super("user entity need valid userId")
		this.name = "MissingUserId"
	}
}


module.exports = MissingUserId;
