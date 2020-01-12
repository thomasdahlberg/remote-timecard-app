const User = require('../models/user');
const Jobsite = require('../models/jobsite');

module.exports = {
    index,
}

function index(req, res) {
    Jobsite.find({}, function(err, jobsites){
        res.render('users/index', {title: 'Remote Timecard!', user: req.user, jobsites});    
    });
}