const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PackageSchema = new Schema({
    name: {type: String, required: true, unique: true},
    type: {type: String, required: true},
    price: {type: Number, min: 1},
    credit: {type: Number, min: 1},
    image: {type: String}
});

module.exports = mongoose.model('PackageSchema', PackageSchema);