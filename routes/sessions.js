const router = require('express').Router();
const sessionsCtrl = require('../controllers/sessions');

router.get('/', isLoggedIn, sessionsCtrl.index)
router.post('/', isLoggedIn, sessionsCtrl.create);
router.delete('/:id', isLoggedIn, sessionsCtrl.delete);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
  }

module.exports = router;