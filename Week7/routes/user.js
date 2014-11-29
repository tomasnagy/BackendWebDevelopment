/**
 * Created by tomasnagy on 13/11/14.
 */
var users = require("../data/data.json");

module.exports = function(app) {
    app.get('/users', function(req, res) {
        res.render('users/index', { title: 'Users', users: users});
    });
}