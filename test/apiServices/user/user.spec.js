//test deps
const chai = require('chai');
const {expect, assert} = chai;

//app deps
const User = require("src/apiServices/user/user")
const InvalidUserId   = require("src/apiServices/user/exceptions/InvalidUserId")
const MissingUserId   = require("src/apiServices/user/exceptions/MissingUserId")
const UserUUID		  = require("src/apiServices/user/class/UserUUID")
const UserIdValidator = require("src/apiServices/user/class/UserIdValidator")
describe('User class entity', () => {
	const validUserId 	= new UserUUID().value;
	const validUsername = "Abcdfgh9";
	const validPassword = "Password981";
	const userInstance = new User({
		user_id: validUserId,
		username: validUsername,
		password: validPassword
	});
	describe("password compare",()=>{
		it('compare same password', () => {
			/* pass a no encrypted password and compare */
			expect( userInstance.comparePassword(validPassword) )
			.to.be.true;
		});
		it('compare different password', () => {
			const diferentPassword = "DiferentPas1";
			expect( userInstance.comparePassword(diferentPassword) )
			.to.be.false;
		})
	})
	describe('user id', () => {
		it('get uuid', () => {
			expect( userInstance.getId() ).to.equal(validUserId)
		});
		it('instance user without user id', () => {
			expect(()=>{
				new User({
					username: validUsername,
					password: validPassword
				})
			}).to.throw(MissingUserId)
		});
		it('instance user with invalid user_id', () => {
			const invalidUserId = "sadabsd";

			expect( function(){
				new User({
					user_id: invalidUserId,
					username: validUsername,
					password: validPassword
				})
			}).to.throw(InvalidUserId)
		});
	});
});
