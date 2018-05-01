"use strict";

const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobName: {
        type: String,
        required: false
    },
    boatFullAddress: {
        type: String,
        required: false
    },
    services: {
        type: [String],
        required: false
    },
    otherService: {
        type: String,
        required: false
    },
    serviceDate: {
        type: Date,
        default: Date.now,
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

// jobSchema.virtual('allServices').
//     get(function() {
//         return this.services + ", " + this.otherService;
//     });

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;