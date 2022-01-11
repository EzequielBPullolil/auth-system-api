require("dotenv").config()
const CryptoJS = require("crypto-js");
const AES = require("crypto-js/aes");
const key = process.env.encryptKey || "dev-key"
class PasswordEncryptManager {

	encrypt(password){
		/* encrypt password using AES and add user-pass in the start*/
		const userEncrypt = AES.encrypt(password, key)
		return `user-pass${userEncrypt}`
	}
	comparePassword(user_password,password){
		/* decrypt user_password and return user_password equals password*/
		let parsedPassword = this.#parsePassword(user_password);
		let bytes = AES.decrypt(parsedPassword, key); //decrypt
		let decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

		return decryptedPassword == password.toString();
	}
	#parsePassword(password){
		return password.toString().replace("user-pass","")
	}

}

module.exports = PasswordEncryptManager;
