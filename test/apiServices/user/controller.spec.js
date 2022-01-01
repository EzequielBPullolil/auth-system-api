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
	it('create user', () => {
		expect( userController.createUser( userParams ) )
		.to.be.an.instanceof( User )
	});

	it('auth user', () => {
		expect( userController.authUser( userParams ) )
		.to.be.true;
	});
});
