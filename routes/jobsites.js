const router = require('express').Router();
const jobsitesCtrl = require('../controllers/jobsites');

router.get('/', isLoggedIn, jobsitesCtrl.index);
router.get('/new', isLoggedIn, jobsitesCtrl.new);
router.get('/:id', isLoggedIn, jobsitesCtrl.show)
router.post('/', isLoggedIn, jobsitesCtrl.create);
router.get('/:id/edit', isLoggedIn, jobsitesCtrl.edit);
router.put('/:id', isLoggedIn, jobsitesCtrl.update);
router.delete('/:id', isLoggedIn, jobsitesCtrl.delete);


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
  }


module.exports = router;