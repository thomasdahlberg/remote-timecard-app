const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    googleId: String,
    email: String,
    avatarUrl: String,
    sessions: [{type: Schema.Types.ObjectId, ref: 'Session'}],
    name: String,
    totalHours: Number,
    active: Boolean,
    adminUser: Boolean 
},{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
