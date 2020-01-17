const Session = require('../models/session');
const Jobsite = require('../models/jobsite');
const User = require('../models/user');
let verification;

module.exports = {
    index,
    create,
    delete: deleteOne,
    edit: editView,
    update: updateOne
}

function editView(req, res) {
    Session.findById(req.params.id, function(err, session){
        let sessionDate = session.punchClock.timePunch;
        let formattedMonth = sessionDate.getMonth() + 1;
        if(formattedMonth < 10) {
            formattedMonth = formattedMonth.toString().padStart(2,'0');
        };
        let formattedDate = `${sessionDate.getFullYear()}-${formattedMonth}-${sessionDate.getDate().toString().padStart(2,'0')}T${sessionDate.getHours().toString().padStart(2, '0')}:${sessionDate.getMinutes().toString().padStart(2, '0')}`;
        res.render('sessions/edit', {title: 'Update Jobsite',user: req.user, session, formattedDate});
    });
}

function updateOne(req, res) {
    console.log(req.body);
    // Session.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, updatedPuppy){
 
}

function deleteOne(req, res) {
    console.log(req);
    Session.findOneAndDelete({_id: req.params.id}, function(err){
        if(err) return console.log(err);
        res.redirect('../../sessions');
    })
}

function create(req, res) {
    let clockLat = Number(req.body.latitude);
    let clockLon = Number(req.body.longitude);
    let site = req.body.jobsite
    // console.log(site);
    Jobsite.findById(site, function(err, jobsite){
        let jobLat = Number(jobsite.latitude);
        // console.log(jobsite);
        // console.log(`ERROR: ${err}`);
        let jobLon = Number(jobsite.longitude);
        let distanceClocked = distanceMath(jobLat,jobLon,clockLat,clockLon);
        // console.log(`DISTANCE: ${distanceClocked}`);
        proximityVerification(jobsite.siteRadius,distanceClocked);
        session = new Session({
        user: req.user._id,
        userName: req.user.name,
        jobsite: req.body.jobsite,
        siteName: jobsite.siteName,
        punchClock: {
            timePunch: new Date(),
            latitude: Number(req.body.latitude),
            longitude: Number(req.body.longitude),
            verified: verification,
            proximity: distanceClocked
            }
        });
        console.log(session);
        session.save(function(err) {
            if(err) return res.redirect('/');
            User.findById(req.user._id, function(err, user) {
                user.sessions.push(session._id);
                user.save()
                Jobsite.findById(site, function(err, jobsite){
                    jobsite.sessions.push(session._id);
                    jobsite.save();
                    // console.log(jobsite);
                });
                // console.log(user);
            });
        res.redirect('/sessions');
    });
});
}

function index(req, res){
    console.log(req.user);
    if(req.user.adminUser === true){
        Session.find({}, function(err, sessions){
            res.render('sessions/index', {title: 'Sessions Reports', user: req.user, sessions,});
        });
    } else {
        Session.find({user: req.user}, function(err, sessions){
        // Jobsite.findById(session.jobsite, function(err, jobsite){
            res.render('sessions/index', {title: 'Sessions Report', user: req.user, sessions});    
        
        });
    }
}
    
function distanceMath(lat1, lon1, lat2, lon2) {
    let p = 0.017453292519943295;    
    let c = Math.cos;
    let a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  
    return 12742 * Math.asin(Math.sqrt(a));
  }

  function proximityVerification(siteRadius, proximity){
      if(proximity <= siteRadius){
          verification = true;
      } else {
          verification = false;
      }
    //   console.log(verification);
  }