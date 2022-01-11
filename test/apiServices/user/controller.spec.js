require("dotenv").config();
const chai = require('chai');
const {expect, assert} = chai;
const chaiAsPromised = require("chai-as-promised")
const jwt 			 = require("jsonwebtoken")
const {sequelize}	 = require('test/utils/db_connection');
const JwtVerify      = require("src/apiServices/user/class/JwtVerify")
const JwtGenerator   = require("src/apiServices/user/class/JwtGenerator")
const UserController = require("src/apiServices/user/controller");
const User 			 = require("src/apiServices/user/user");
const UserUUID 		 = require('src/apiServices/user/class/UserUUID');
const AlreadyTakeUsername 	= require("src/apiServices/user/exceptions/AlreadyTakeUsername");
const UsernameNotExist 		= require("src/apiServices/user/exceptions/UsernameNotExist");
const UserModel				= require("src/apiServices/user/class/UserModel")
describe('user controller test', async () => {
	chai.use(chaiAsPromised)
	//testcase deps
	const userModel = new UserModel(sequelize);
	//user values
	const user_id = new UserUUID().value;
	const username = "Ezequiel";
	const password = "Abcdfgh2";

	const userController = new UserController(userModel);
	describe('Create user',() => {
		it('create valid user', async () => {
			const user = await userController.createUser({
				user_id,
				username,
				password
			})
			return expect( user ).to.be.instanceof(User)
		});
		it('try sing user with already take username', () => {
			let user_id = new UserUUID().value;
			return expect(
				userController.createUser({
					user_id,
					username,
					password
				})
			).to.eventually.be.rejectedWith(AlreadyTakeUsername)
		});
	});
	describe('Auth', () => {
		const secret = process.env.JWT_SECRET;
		it("auth non exist user", ()=>{
			let username = "no existo";
			let password = "no existo x2";

			return expect(
				userController.authUser({username, password})
			).to.eventually.be.rejectedWith(UsernameNotExist)
		})

		it('auth exist user', () => {
			return expect(
				userController.authUser({username,password})
			).to.eventually.be.equal(
				JwtGenerator({
				user_id,
				username
			}))
		});
		it('auth user return jwt', async() => {
			const authUser = await userController.authUser({username, password}) ;
			console.log(authUser)
			return expect( () =>{
				JwtVerify(authUser, secret)
			} ).to.not.throw();
		});
	});
	after(function(done){
		sequelize.query("DELETE FROM Users")
		done();
	})
});
