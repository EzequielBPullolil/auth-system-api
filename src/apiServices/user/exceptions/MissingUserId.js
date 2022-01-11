class MissingUserId extends Error {
	constructor() {
		super("user entity need userId")
		this.name = "MissingUserId"
	}
}


module.exports = MissingUserId;
