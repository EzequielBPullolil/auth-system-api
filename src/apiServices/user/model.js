module.exports = (sequelize, Sequelize) =>{
	const User = sequelize.define( "User", {
		user_id : {
			primaryKey:true,
			type:Sequelize.STRING
		},
		username: {
			type: Sequelize.STRING
		},
		password: {
			type: Sequelize.STRING
		}
	},{
		timestamps: false,
		tableName : "Users"
	} )

	return User
}
