const chai = require('chai');
const {expect, assert} = chai;
const chaiHttp = require("chai-http")
const app 	   = require("src/app")
chai.use(chaiHttp);
describe('UserRoutes', () => {
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
					expect(res).to.be.json
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
					expect(res).to.be.json
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
	describe('POST user/', () => {
		describe('username', () => {
			it('username empty', () => {
				chai.request(app)
					.post( "/user" )
					.send({
						"username":"",
						"password":"nonEmpty"
					})
					.end( (err,res)=>{
						expect(res).to.have.status(400)
					})
			});
			it('username not defined', () => {
				chai.request(app)
					.post("/user")
					.send({
						"username":"",
						"password":"nonEmpty"
					})
			});
		});
		describe('password', () => {
			it('password empty', () => {

			});
			it('password not defined', () => {

			});
		});
	});
});
