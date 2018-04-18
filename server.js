'use strict';

// const User = require('./models/user.js');

const express = require('express');
const morgan = require('morgan');

const app = express();

const { DATABASE_URL, PORT } = require('./config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

app.use(morgan('common'));
app.use(express.static('public'));

// app.get('/', function(req, res) {
//     res.sendFile(_dirname + '/public/index');
// });



// ---------------- RUN/CLOSE SERVER -----------------------------------------------------
let server;

function runServer(databaseUrl, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(port, () => {
                    console.log(`Listening on localhost:${port}`);
                    resolve();
                })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    }));
}

if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
}

// ---------------USER ENDPOINTS------------------------------
// POST
// Create a new user

app.post('/users/create', (req, res) => {

    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let phoneNumber = req.body.phoneNumber;
    let address = req.body.address;
    let address2 = req.body.address2;
    let city = req.body.city;
    let state = req.body.state;
    let zipCode = req.body.zipCode;
    let type = req.body.type;
    let status = req.body.status;
    let email = req.body.email;
    email = email.trim();
    let password = req.body.password;
    password = password.trim();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }

        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }

            User.create({
                firstName,
                lastName,
                phoneNumber,
                address,
                address2,
                city,
                state,
                zipCode,
                email,
                type,
                status,
                password: hash,
            }, (err, item) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Internal Server Error'
                    });
                }
                if (item) {
                    console.log(`User \`${firstName}\` created.`);
                    return res.json(item);
                }
            });
        });
    });
});

// catch-all endpoint if client makes request to non-existent endpoint
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
});

exports.app = app;
exports.runServer = runServer;
exports.closeServer = closeServer;