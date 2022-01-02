const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const chaiAsPromised = require("chai-as-promised")


const UserController = require("src/apiServices/user/controller");
const User 			 = require("src/apiServices/user/user");
const AlreadyTakeUsername = require("src/apiServices/user/exceptions/AlreadyTakeUsername");
const {userModel} = require('test/utils/db_connection');

describe('user controller test', () => {
	chai.use(chaiAsPromised)
	const userController = new UserController(userModel);
	before(() => {
		userModel.destroy({
			where:{
				username: "ezequiel"
			}
		})
	});
	const userParams = {
		user_id: "abcsadas",
		username: "ezequiel",
		password: "ezequieL45"
	}
	describe('create user', () => {
		it('create user with username already taken', () => {
			const alreadyExistUser = {
				user_id:"abc",
				username:"alreadyExistUser",
				password:"abcdfgH5"
			};
			return expect(
				userController.createUser( alreadyExistUser )
			).be.rejectedWith(AlreadyTakeUsername);
		});
		it('create user instance', async () => {
			const user = await userController.createUser( userParams )

			expect(user).to.be.instanceof( User )
		});
	});
	describe('auth user', () => {
		it('auth non exist user', () => {
			const nonExistUser = {
				username:"im not exist",
				password:"nonExistUser"
			}
			expect( userController.authUser( nonExistUser ) )
			.to.be.false;
		});
		it('auth exist user', () => {
			expect( userController.authUser( userParams ) )
			.to.be.true;
		});

	});

});
