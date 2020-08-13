const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassesSchema = new Schema({
    className: {type: String, require: true, unique: true},
    classDesc: {type: String, require: true},
    classType: {type: String, required: true},
    classSize: {type: Number, min: 1},
    classImage: {type: String}
});

module.exports = mongoose.model('ClassesSchema', ClassesSchema);