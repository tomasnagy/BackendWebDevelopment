/**
 * Created by tomasnagy on 27/11/14.
 * connectDB.js
 */
module.exports = (function () {
    var mongoose = require("mongoose"),
        mongodbURL = 'mongodb://localhost/userdb',
        db = mongoose.connect(mongodbURL); //connecteer de database
    mongoose.connection.on("open", function () {
        console.log("connection met mongo server " + mongodbURL);
        // get collection (=table) names als test
        mongoose.connection.db.collectionNames(function (err, names) {
            console.log("collection list:");
            console.log(names);
        });
    });
    mongoose.connection.on("error", function () {

    });
    mongoose.connection.on("close", function () {

    });
})();
