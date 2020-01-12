const router = require('express').Router();
const jobsitesCtrl = require('../controllers/jobsites');

router.get('/', isLoggedIn, jobsitesCtrl.index);
router.get('/:id', isLoggedIn, jobsitesCtrl.show)
router.get('/new', isLoggedIn, jobsitesCtrl.new);
router.post('/', isLoggedIn, jobsitesCtrl.create);
router.get('/:id/edit', isLoggedIn, jobsitesCtrl.edit);
router.put('/:id', isLoggedIn, jobsitesCtrl.update);

module.exports = router;