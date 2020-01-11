const Session = require('../models/session');
const Jobsite = require('../models/jobsite');


module.exports = {
    create
}

function create(req, res) {
    console.log(req.body)
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
        res.redirect('/users');
    });
}

