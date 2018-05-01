'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const expect = chai.expect;

const { Job } = require('../models/jobs');
const { Boat } = require('../models/boats');
const { User } = require('../models/users');
const {app, runServer, closeServer} = require('../server');
const { TEST_DATABASE_URL } = require('../config');

chai.use(chaiHttp);


// Tear down Database after each test
function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}



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

});