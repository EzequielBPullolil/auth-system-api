const chai = require('chai');
const {expect, assert} = chai;
const chaiAsPromised = require("chai-as-promised")


const UserController = require("src/apiServices/user/controller");
const User 			 = require("src/apiServices/user/user");
const AlreadyTakeUsername = require("src/apiServices/user/exceptions/AlreadyTakeUsername");
const {userModel} = require('test/utils/db_connection');

describe('user controller test', async () => {
	chai.use(chaiAsPromised)
	const userController = new UserController(userModel);
	const username = "Ezequiel";
	it('create user', async () => {
		let user_id = "a";
		let password = "Abcdfgh2";
		const user = await userController.createUser({
			user_id,
			username,
			password
		})

		return expect( user ).to.be.instanceof(User)
	});
	it('try sing user with already take username', () => {
		let user_id = "ab";
		let password = "Abcdfgh2";
		return expect(
			userController.createUser({
				user_id,
				username,
				password})).to.eventually.be.rejectedWith(AlreadyTakeUsername)
	});

	after(function(done){
		userModel.destroy({
			where:{
				username
			}
		})
		done();
	})
});
