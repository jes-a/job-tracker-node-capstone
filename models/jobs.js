"use strict";

const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobName: {
        type: String,
        required: false
    },
    jobAddress: {
        type: String,
        required: false
    },
    services: {
        type: [String],
        required: false
    },
    serviceDate: {
        type: String,
        required: false
    },
    assignTo: {
        type: [String],
        required: false
    },
    jobNotes: {
        type: String,
        required: false
    },
});


const Job = mongoose.model('Job', jobSchema);

module.exports = Job;