const router = require('express').Router();
const jobsitesCtrl = require('../controllers/jobsites');

router.post('/jobsites', isLoggedIn, jobsitesCtrl.create);

module.exports = router;