const { Sequelize } = require("sequelize")
const config 		= require("config")
const {database, username, password, host, dialect} = config.get("Database.dbConfig");
const sequelize = new Sequelize(database, username, password, {
	host,
	dialect
})
const db = {};


db.userModel = require("src/apiServices/user/model")(sequelize, Sequelize)
db.sequelize = sequelize;
module.exports = db;
