/**
 * Created by tomasnagy on 27/11/14.
 * Scheme user.js
 */
var mongoose = require('mongoose'),
    emailRegExp = /.+\@.+\..+/,
    UserSchema = new mongoose.Schema({
        username: {type: String, unique: true},
        name: {type: String, index: true},
        profession: String,
        email: {
            type: String,
            required: false,
            match: emailRegExp
        },
        gender: {
            type: String,
            required: true,
            uppercase: true,
            trim: true,
            enum: ['M', 'F']
        },
        createdOn: {type: Date, 'default': Date.now}
    });

module.exports = UserSchema;