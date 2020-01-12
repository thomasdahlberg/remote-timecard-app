const router = require('express').Router();
const apisCtrl = require('../controllers/api/apis');

router.get('/', isLoggedIn, apisCtrl.ajax);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
  }

module.exports = router;