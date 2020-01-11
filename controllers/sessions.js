const Session = require('../models/session');
const Jobsite = require('../models/jobsite');
const User = require('../models/user');

module.exports = {
    create
}

function create(req, res) {
    // console.log(req.body)
    session = new Session({
        user: req.user._id,
        clockIn: {
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

