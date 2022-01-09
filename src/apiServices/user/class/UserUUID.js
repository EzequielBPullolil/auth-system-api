const { v4: uuidv4 } = require('uuid');
class UserUUID{
	constructor(){
		this.value = `user-${uuidv4()}`
	}
}

module.exports  = UserUUID;
