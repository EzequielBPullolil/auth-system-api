const config = require("config")
const {Sequelize} = require("sequelize");
const {database, username, password, host, dialect} = config.get("Test.dbConfig");
const sequelize = new Sequelize(database, username, password, {
	host,
	dialect
})
const db = {}

db.userModel = require("src/apiServices/user/model")(sequelize,Sequelize)
// db.userModel.sync()
module.exports = db;
