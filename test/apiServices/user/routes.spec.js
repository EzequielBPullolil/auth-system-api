const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const chaiHttp = require("chai-http")
const app 	   = require("src/app")
chai.use(chaiHttp)
describe('GET user/', () => {
	describe('username', () => {
		it('username empty', () => {
			chai.request(app)
				.get("/user")
				.send({
					'username':"",
					'password':"password"
				})
				.end((err,res)=>{
					expect(res).to.have.status(400)
				})
		});
		it('username not defined', () => {
			chai.request(app)
				.get("/user")
				.send({
					'password':""
				})
				.end((err,res)=>{
					expect(res).to.have.status(400)
				})
		});
	});
	describe('password', () => {
		it('password empty', () => {
			chai.request(app)
				.get("/user")
				.send({
					'username':"username",
					'password':""
				})
				.end((err,res)=>{
					expect(res).to.have.status(400)
				})
		});
		it('password not defined', () => {
			chai.request(app)
				.get("/user")
				.send({
					'username':"username"
				})
				.end((err,res)=>{
					expect(res).to.have.status(400)
				})
		});
	});


});
