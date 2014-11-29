 /*
 * Module: userRouter.js
 * Routing  voor json collectie "users"
 * reguliere controller ( res.render)  en api controller (json).
 */

var users = require("../data/users.json");

//exports.list = function (req, res) {
//    res.send("respond with a resource");
//};

module.exports = function (app) {
    
    // REGULIERE CONTROLLER ------------------------------------------------------
    //--- READ
    app.get('/users', function (req, res) {
        res.render('users/index', { title: 'Users', users: users });
    });  
    app.get('/users/:name', function (req, res, next) {
        var user = users[req.params.name];
        if (user) {
            res.render('users/details', { title: 'User profile', user: user });
        } else {
            next();
        }
    });
    
    
    //--- CREATE
    app.get('/users/new', function (req, res) {
        res.render('users/create', { title: "New User" });
    });
    app.post('/users', function (req, res) {
        if (users[req.body.username]) {
            res.send('Conflict', 409);
        } else {
            users[req.body.username] = req.body;
            res.redirect('/users');
        }
    });
    
    
    //--- DELETE
    app.del('/users/:name', function (req, res, next) {
       //aanvullen
    })

    //--- UPDATE 
    //app.put();


    //API controller -------------------------------------------------  
    //ajax scripts ophalen vanuit bvb. layout.jade  
    //--- AJAX PAGINA
      app.get('/api/onePageUsers', function (req, res) {
        res.render('users/api', {
            title: 'Ophalen van users met ajax'
        })
    });     
    
    //--- READ   
    app.get('/api/users/', function (req, res) {
        //res.render('users/index', { title: 'users', users: users });
        res.json(users);
        //res.end(JSON.stringify(users)); //alternatief
    });
    app.get('/api/users/details/:name', function (req, res) {
        var userToLookFor = req.params.name;
        if (!users[userToLookFor]) {
            res.statusCode = 404;
            res.end("User not found");
        } else {
            res.json(users[userToLookFor]);
        }
    });

    //--- CREATE 


    //--- DELETE 


    //--- UPDATE


}