'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');


const { Job } = require('../models/jobs');
const { Boat } = require('../models/boats');
const { User } = require('../models/users');
const { app, runServer, closeServer } = require('../server');
const { TEST_DATABASE_URL } = require('../config');

const should = chai.should();
chai.use(chaiHttp);


// Seed random documents into users DB
function generateType() {
	const type = ['worker', 'admin'];
	return type[Math.floor(Math.random() * type.length)];
}

function generateStatus() {
	const status = ['active', 'inactive'];
	return status[Math.floor(Math.random() * status.length)];
}

function seedUserData() {
	console.info('Seeding Admin user data');
	const seedUsersData = [];

	for (let i=1; i<10; i++) {
		seedUserData.push({
		    firstName: faker.name.firstName(),
		    lastName: faker.name.lastName(),
		    phoneNumber: faker.phone.phoneNumber(),
		    address: faker.address.streetAddress(),
		    address2: faker.address.secondaryAddress(),
		    city: faker.address.city(),
		    state: faker.address.stateAbbr(),
		    zipCode: faker.address.zipCode(),
		    email: faker.internet.email(),
		    password: faker.internet.password(),
		    type: generateType(),
		    status: generateStatus()
		});
	}
	return User.insertMany(seedUsersData);
} 

// Seed random documents into jobs DB
function generateServices() {
	const services = [
		'Wash', 'Hull Wash', 'Topside Wax', 'Hull Wax', 'Compounding Service', 'Interior Cleaning', 'Teak Cleaning', 'Teak Sealing', 'Engine Room Detailing', 'System Check', 'Bottom Cleaning'];
		return services[Math.floor(Math.random() * services.length)];
}

function generateAssignTo() {
	const services = [
		'Wash', 'Hull Wash', 'Topside Wax', 'Hull Wax', 'Compounding Service', 'Interior Cleaning', 'Teak Cleaning', 'Teak Sealing', 'Engine Room Detailing', 'System Check', 'Bottom Cleaning'];
		return services[Math.floor(Math.random() * services.length)];
}

function seedJobData() {
	console.info('Seeding Job data');
	const seedJobsData = [];

	for (let i=1; i<10; i++) {
		seedJobData.push({
			jobName: faker.lorem.words(),
		    boatFullAddress: faker.address.streetAddress(),
		    services: [generateServices(), generateServices(), generateServices()],
		    otherService: faker.lorem.words(),
		    serviceDate: faker.date.future(),
		    assignTo: [faker.fake("{{name.firstName}} {{name.lastName}}"), faker.fake("{{name.firstName}} {{name.lastName}}")],
		    jobNotes: faker.lorem.words()
		});
	}
	return Job.insertMany(seedJobsData);
}


// Seed random documents into boats DB
function seedBoatData() {
	console.info('Seeding Boat Data');
	const seedBoatsData = [];

	for (let i=1; i<10; i++) {
		seedBoatsData.push({
			boatName: faker.lorem.words(),
	        boatMake: faker.lorem.words(),
	        boatLength: faker.random.number(),
	        boatAddress: faker.address.address(),
	        boatAddress2: faker.address.secondaryAddress(),
	        boatCity: faker.address.city(),
	        boatState: faker.address.stateAbbr(),
	        boatZipCode: faker.address.zipCode(),
	        boatNotes: faker.lorem.words(),
	        custFirstName: faker.name.firstName(),
	        custLastName: faker.name.lastName(),
	        custEmail: faker.internet.email(),
	        custPhone: faker.phone.phoneNumber(),
	        custAddress: faker.address.address(),
	        custAddress2: faker.address.secondaryAddress(),
	        custCity: faker.address.city(),
	        custState: faker.address.stateAbbr(),
	        custZipCode: faker.address.zipCode()
		});
	}
	return Boat.insertMany(seedBoatsData);
}

// Tear down Database after each test
function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}


// Test User Endpoints

describe('Users API resource', function() {

	before(function() {
		return runServer(TEST_DATABASE_URL)
		.then(console.log('Running server'))
		.catch(err => console.log({err}));
	});

	beforeEach(function() {
		return seedUserData();
	});

	// Test worker list in Admin Screen
	describe('Users GET endpoint', function() {
		it('should return a list of all workers in the DB in Admin Screen', function() {
			let res;
			return chai.request(app)
				.get('/get-users')
				.then(function(_res) {
					res = _res;
					res.should.have.status(200);
					res.body.workerOutput.should.have.length.of.at.least(1);
					return User.count();
				})
				.then(function(count) {
					res.body.workerOutput.should.have.length.of(count);
				})
		});

	});










	afterEach(function() {
		return tearDownDb();
	});

	after(function() {
		return closeServer();
	});

});