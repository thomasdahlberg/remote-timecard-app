const Session = require('../models/session');
const Jobsite = require('../models/jobsite');


module.exports = {
    index,
    show,
    new: newJobsite,
    create,
    edit: editJobsite,
    update
}

function index(req, res) {
    Jobsite.find({}, function(err, jobsites){
        res.render('jobsites/index', {title: 'Jobsites', user: req.user, jobsites});    
    });
}

function show(req, res) {
    Jobsite.findById(req.params.id, function(err, jobsite) {
        Session.find({jobsite: jobsite._id}, function(err, sessions){
            res.render('jobsites/show', {title: 'Jobsite Details', sessions, jobsite})
        });
    });
}

function newJobsite(req, res) {
    res.render('jobsites/new', {title: 'Add a New Jobsite', user: req.user});
}

function create(req, res){
    const jobsite = new Jobsite(req.body);
    jobsite.save(function(err) {
        if(err) return res.redirect('jobsites/new');
        res.redirect('/jobsites');
    })
}

function editJobsite(req, res) {
    Jobsite.findById(req.params.id, function(err, jobsite) {
        Session.find({jobsite: jobsite._id}, function(err, sessions){
            res.render('jobsites/edit', {title: 'Update Jobsite', sessions, jobsite})
        });
    });
}

function update(req, res){
    Jobsite.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, updatedJobsite){
        if(err) return res.redirect('jobsites/edit');
        res.redirect('jobsites/show');
    })
}