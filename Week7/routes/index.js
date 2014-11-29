module.exports = function(app) {
    var users = require("../data/data.json");

    app.get('/', function(req, res) {
        res.render('users/index', { title: 'Users'});
    })
}