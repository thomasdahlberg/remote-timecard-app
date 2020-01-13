const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const jobsiteSchema = new Schema({
    siteName: String,
    address: String,
    latitude: Number,
    longitude: Number,
    siteRadius: Number,
    sessions: [{type: Schema.Types.ObjectId, ref: 'Session'}],
    active: Boolean
},{
    timestamps: true
});

module.exports = mongoose.model('Jobsite', jobsiteSchema);
