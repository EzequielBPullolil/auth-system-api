const { validate } = require('uuid');
const InvalidUserId = require("src/apiServices/user/exceptions/InvalidUserId")
class UserIdValidator {
	constructor(user_id) {
		this.user_id = user_id;
		this.userId();
	}
	userId(){
		const filter = this.user_id.replace("user-", "")
		if( !validate(filter) ) throw new InvalidUserId();
	}
}

module.exports = UserIdValidator
