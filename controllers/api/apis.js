const stringify = require('csv-stringify');
const Session = require('../../models/session');
const csvPost = require('../../file.json');

module.exports = {
    ajax: getAjaxAPI,
    csvReport
}

function getAjaxAPI(req, res) {
    res.status(200).json(process.env.API_KEY);
}

function csvReport(req, res) {
    console.log('csv firing');
    Session.find({}, function(err, sessions){
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=\"' + 'download-' + Date.now() + '.csv\"');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Pragma', 'no-cache');
        
        stringify(csvPost, { header: true }).pipe(res);
    });
}

