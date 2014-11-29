var express = require('express'),
    router = express.Router(),
    User = require('../data/models/user'),
    loadUser = require('./middleware/load_user');
/* GET users listing. */
router.get('/', function (req, res, next) {
    User.find({}).exec(function (err, docs) {
        res.render('users/index', { title: 'Users overzicht', userlist: docs });
    })
});

router.get('/new', function (req, res) {
    res.render('users/create', { title: "New User" });
})


router.post('/', function (req, res, next) {
    //bodyParser vult req.body op
    User.findOne({ username: req.body.username }, function (err, user) {
        if (err) {
            return next(err);
        }

        User.create(req.body, function (err) {
            //via het model
            if (err) {
                if (err === 11000) {
                    res.send('conflict op username', 409)
                } else {
                    if (err.name === 'ValidationError') {
                        return res.send(Object.keys(err.errors).map(function (errField) {
                            return err.errors[errField].message;
                        }).join('<br/>'), 406)
                    } else {
                        //if (err) {
                        next(err);
                    }
                }
                return
            }
            res.redirect('/users');
        });
    });
});


router.get('/edit/:name', loadUser, function (req, res, next) {
    res.render('users/edit', { title: 'Edit User', user: req.user });
});

router.get('/:name', loadUser, function(req, res, next) {
    res.render('users/details', {title: 'User profile', user: req.user});
});

module.exports = router;

