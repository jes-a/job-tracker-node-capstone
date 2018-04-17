'use strict'; 

const express = require('express');
const morgan = require('morgan');

const app = express();

const { DATABASE_URL, PORT } = require('./config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

app.use(morgan('common'));   
app.use(express.static('public'));

app.get('/', function(req, res) {
	res.sendFile(_dirname + './public/');	
});



 // ---------------- RUN/CLOSE SERVER -----------------------------------------------------
let server;

function runServer(databaseUrl, port=PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if(err) {
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
            if(err) {
                return reject(err);
            }
            resolve();
        });
    }));
}

if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
}

// catch-all endpoint if client makes request to non-existent endpoint
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
});

module.exports = { app, runServer, closeServer };