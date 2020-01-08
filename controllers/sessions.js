const User = require('../models/user');
const Session = require('../models/session');

module.exports = {
    create
}

//functional, but need to create jobsite objects first
function create(req, res) {
    session = new Session({
        user: req.user._id
    });
    session.save(function(err) {
        if(err) return res.redirect('/');
        res.redirect('/users');
    });
}
