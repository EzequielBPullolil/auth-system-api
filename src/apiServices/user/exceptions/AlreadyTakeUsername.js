class AlreadyTakeUsername extends Error {
	constructor() {
		super("Username is already sing")
		this.name = "AlreadyTakeUsername"
	}
}


module.exports = AlreadyTakeUsername;
