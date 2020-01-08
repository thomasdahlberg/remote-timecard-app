const router = require('express').Router();
const sessionsCtrl = require('../controllers/sessions');

router.post('/sessions', isLoggedIn, sessionsCtrl.create);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
  }

module.exports = router;