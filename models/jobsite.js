const mongoose = require('mongoose');

const jobsiteSchema = new mongoose.Schema({
    siteName: String,
    latitude: Number,
    longitude: Number,
    siteRadius: Number,
    session: String,
    active: Boolean
},{
    timestamps: true
});

module.exports = mongoose.model('Jobsite', jobsiteSchema);
