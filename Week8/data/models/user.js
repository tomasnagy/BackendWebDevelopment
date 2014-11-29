/**
 * Created by tomasnagy on 27/11/14.
 * Model user.js
 */
var mongoose = require("mongoose"),
    UserSchema = require("../schemes/user"),
    User = mongoose.model('Test', UserSchema, 'testsefasdflwhe');  //model,schema,collection

module.exports = User;