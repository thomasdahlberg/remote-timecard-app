const Session = require('../models/session');
const Jobsite = require('../models/jobsite');
let activeinput;


module.exports = {
    index,
    new: newJobsite,
    create,
    edit: editJobsite,
    update: updateOne,
    delete: deleteOne
}

function index(req, res) {
    Jobsite.find({}, function(err, jobsites){
        res.render('jobsites/index', {title: 'Jobsites', user: req.user, jobsites});    
    });
}

function newJobsite(req, res) {
    res.render('jobsites/new', {title: 'Add a New Jobsite', user: req.user, placesKey: process.env.API_KEY});
}

function create(req, res){
    console.log(req.body);
    const jobsite = new Jobsite({
        siteName: req.body.name,
        address: req.body.address,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        siteRadius: 1,
        sessions: [],
        active: true
    });
    jobsite.save(function(err) {
        if(err) return res.redirect('jobsites/new');
        res.redirect('/jobsites');
    })
}

function editJobsite(req, res) {
    Jobsite.findById(req.params.id, function(err, jobsite) {
        Session.find({jobsite: jobsite._id}, function(err, sessions){
            res.render('jobsites/edit', {title: 'Update Jobsite', user: req.user, sessions, jobsite})
        });
    });
}

function updateOne(req, res) {
    console.log(req.body);
    console.log(req.params.id);
    if(req.body.activeinput){
        activeinput = true;
    } else {
        activeinput = false;
    }
    Jobsite.findByIdAndUpdate(req.params.id, {
            // latitude: Number(req.body.latitude),
            // longitude: Number(req.body.longitude),
            siteRadius: req.body.radius,
            active: activeinput
        }, function(err, updatedJobsite){
        console.log(updatedJobsite);
        if(err) return console.log(err);
        res.redirect('../../jobsites')
    });
}


function deleteOne(req, res) {
    console.log(req);
    Jobsite.findOneAndDelete({_id: req.params.id}, function(err){
        if(err) return console.log(err);
        res.redirect('../../jobsites');
    })
}