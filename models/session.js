const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const timeCardValidationSchema = new mongoose.Schema({
    timePunch: Date,
    latitude: Number,
    longitude: Number,
    verfied: Boolean
},{
    timestamps: true
});

const sessionSchema = new mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    jobsite: {type: Schema.Types.ObjectId, ref: 'Jobsite'},
    punchClock: timeCardValidationSchema,
},{
    timestamps: true
});

module.exports = mongoose.model('Session', sessionSchema);
