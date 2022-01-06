class UsernameNotExist extends Error {
	constructor() {
		super("username not sing")
		this.name = "UsernameNotExist"
	}
}


module.exports = UsernameNotExist;
