'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

const {app, runServer, closeServer} = require('../server');

chai.use(chaiHttp);
// app.use(morgan('common'));


describe('pages test', function() {

	before(function() {
		return runServer();
	});

	after(function() {
		return closeServer();
	});


	it('index should exist', function() {
		return chai.request(app)
		.get('/')
		.then(function (res) {
			expect(res).to.have.status(200);
		});
	});

	it('admin should exist', function() {
		return chai.request(app)
		.get('/admin.html')
		.then(function (res) {
			expect(res).to.have.status(200);
		});
	});

	it('jobs should exist', function() {
		return chai.request(app)
		.get('/jobs.html')
		.then(function (res) {
			expect(res).to.have.status(200);
		});
	});

});