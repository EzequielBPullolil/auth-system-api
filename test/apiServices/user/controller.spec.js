const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

const userController = require("src/apiServices/user/controller");
const User 			 = require("src/apiServices/user/user");
describe('user controller test', () => {
	const userParams = {
		username: "ezequiel",
		password: "ezequieL45"
	}
	describe('create user', () => {
		it('create user with username already taken', () => {
			const alreadyExistUser = {
				username:"alreadyExistUser",
				password:"abcdfgH5"
			};
			expect( ()=>{
				userController.createUser( alreadyExistUser )
			} ).to.throw(AlreadyTakeUsername);
		});
		it('create user', () => {
			expect( userController.createUser( userParams ) )
			.to.be.an.instanceof( User )
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
