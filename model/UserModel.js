const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    avatar: {type: String},
    package: [
        {
            PackageName: {type: String, required: true},
            type: {type: String, required: true},
            classNumber: {type: Number, min: 1},
            expiry: {type: Date},
            activation: {type: Boolean, required: true},
            image: {type: String}
        }
    ],
    instructor: {type: Boolean, required: true}
});

module.exports = mongoose.model('UserSchema', UserSchema);