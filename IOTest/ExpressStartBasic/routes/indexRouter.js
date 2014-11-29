
/*
 * GET home page.
 */
module.exports = function(app) {
    app.get('/', function (req, res) {
        res.redirect('/users');
        //  res.render('index', { title: 'Express' });
    });
}