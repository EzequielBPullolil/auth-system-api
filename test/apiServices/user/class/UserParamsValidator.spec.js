const chai = require('chai');
const {expect, assert} = chai;
const chaiAsPromised = require("chai-as-promised")

const UserParamsValidator = require("src/apiServices/user/class/UserParamsValidator");
const InvalidUsername     = require("src/apiServices/user/exceptions/InvalidUsername")
const InvalidPassword     = require("src/apiServices/user/exceptions/InvalidPassword")
describe('UserParamsValidator test', () => {
	let validUsername = "abcdfLL9";
	let validPassword = "Abcdfgh2";
	describe('Validate valdiUsername and validPassword', () => {
		expect(()=>{
			new UserParamsValidator({
				username: "asdasd",
				password: validPassword
			})
		}).to.not.throw(InvalidPassword)
		expect(()=>{
			new UserParamsValidator({
				username:  validUsername,
				password: "asdasda"
			})
		}).to.not.throw(InvalidUsername)
	});
	describe('username', () => {
		it('empty username', () => {
			let username = "";
			expect( ()=>{
				new UserParamsValidator({
					username,
					password: validPassword
				})
			}).to.throw(InvalidUsername,"empty username")
		});
		it('no alphanumeric username', () => {
			let username = "abcd-fg#";
			expect( ()=>{
				new UserParamsValidator({
					username,
					password: validPassword
				})
			}).to.throw(InvalidUsername,"no alphanumeric username")
		});
		it('username length < 8', () => {
			let username = "abc8";
			expect( ()=>{
				new UserParamsValidator({
					username,
					password: validPassword
				})
			}).to.throw(InvalidUsername,"username length lower than 8")
		});
	})
	describe('password', () => {
		it('empty password', () => {
			let password = "";
			expect( ()=>{
				new UserParamsValidator( {
					username: validUsername,
					password
				})
			}).to.throw(InvalidPassword, "weak password")
		});
		it('no uppercase password', () => {
				let password = "abcfghi8";
				expect( ()=>{
					new UserParamsValidator( {
						username: validUsername,
						password
					})
				}).to.throw(InvalidPassword, "weak password")
		});
		it('no lowercase password', () => {
			let password = "ABCFGHI8";
			expect( ()=>{
				new UserParamsValidator( {
					username: validUsername,
					password
				})
			}).to.throw(InvalidPassword, "weak password")
		});
		it('no numer password', () => {
			let password = "ABCFGHIa";
			expect( ()=>{
				new UserParamsValidator( {
					username: validUsername,
					password
				})
			}).to.throw(InvalidPassword, "weak password")
		});
		it('password length < 8', () => {
			let password = "ABCfg8";
			expect( ()=>{
				new UserParamsValidator( {
					username: validUsername,
					password
				})
			}).to.throw(InvalidPassword, "weak password")
		});
	});
});
