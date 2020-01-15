const router = require('express').Router();
const sessionsCtrl = require('../controllers/sessions');

router.post('/', isLoggedIn, sessionsCtrl.create);
router.get('/', isLoggedIn, sessionsCtrl.index)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
  }

module.exports = router;