const  bcrypt  =  require ( 'bcrypt' )
class PasswordEncryptManager {
	#saltRounds = 10;
	#salt 		= bcrypt.genSaltSync(this.#saltRounds)
	constructor() {
	}

	encrypt(password){
		return `user-pass${bcrypt.hashSync(password, salt)}`
	}
	decrypt(password){
		return password.replace("user-pass")
	}

}

module.exports = PasswordEncryptManager;
