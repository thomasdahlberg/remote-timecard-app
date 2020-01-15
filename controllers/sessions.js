const Session = require('../models/session');
const Jobsite = require('../models/jobsite');
const User = require('../models/user');

module.exports = {
    index,
    create
}

function create(req, res) {
    console.log(req.body.jobsite);
    session = new Session({
        user: req.user._id,
        jobsite: req.body.jobsite,
        punchClock: {
            timePunch: new Date(),
            latitude: Number(req.body.latitude),
            longitude: Number(req.body.longitude)
        }
    });
    console.log(session);
    session.save(function(err) {
        if(err) return res.redirect('/');
        User.findById(req.user._id, function(err, user) {
            user.sessions.push(session._id);
            user.save()
            console.log(user);
        });
        res.redirect('/users');
    });
}

function index(req, res){
    Session.find({}, function(err, sessions){
        res.render('sessions/index', {title: 'Sessions Report', user: req.user, sessions});    
    });
}