const User 		  = require("src/apiServices/user/user");
const { QueryTypes } = require('sequelize');
class UserModel {
	constructor(sequelize){
		this.sequelize = sequelize
	}
	async findOneByUsername(username){
		const [user] = await this.sequelize.query(`SELECT * FROM Users WHERE BINARY username='${username}'`, { type: QueryTypes.SELECT })
		if(!user) return null;
		return new User({
			user_id: user.user_id,
			username: user.username,
			password: user.password
		})

	}

	async create({user_id,username, password}){
		const user = await this.sequelize.query(`INSERT INTO Users VAlUES('${user_id}','${username}','${password}')`);
	};

}

module.exports = UserModel;
