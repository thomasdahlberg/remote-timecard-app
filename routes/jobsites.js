const router = require('express').Router();
const jobsitesCtrl = require('../controllers/jobsites');

router.get('/', isLoggedIn, isAdmin, jobsitesCtrl.index);
router.get('/new', isLoggedIn, isAdmin, jobsitesCtrl.new);
router.post('/', isLoggedIn, isAdmin, jobsitesCtrl.create);
router.get('/:id', isLoggedIn, isAdmin, jobsitesCtrl.edit);
router.put('/:id', isLoggedIn, isAdmin, jobsitesCtrl.update);
router.delete('/:id', isLoggedIn, isAdmin, jobsitesCtrl.delete);


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
  }

function isAdmin(req, res, next) {
  if (req.user.adminUser === true) return next();
  res.redirect('/');
}


module.exports = router;