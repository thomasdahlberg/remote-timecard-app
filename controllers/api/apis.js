module.exports = {
    ajax: getAjaxAPI
}

function getAjaxAPI(req, res) {
    res.status(200).json(process.env.API_KEY);
}