const router = require('express').Router();
const sessionsCtrl = require('../controllers/sessions');

router.get('/', isLoggedIn, sessionsCtrl.index)
router.post('/', isLoggedIn, sessionsCtrl.create);
router.get('/:id', isLoggedIn, isAdmin, sessionsCtrl.edit);
router.put('/:id', isLoggedIn, isAdmin, sessionsCtrl.update);
router.delete('/:id', isLoggedIn, sessionsCtrl.delete);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
  }

function isAdmin(req, res, next) {
    if (req.user.adminUser === true) return next();
    res.redirect('/');
  }

module.exports = router;