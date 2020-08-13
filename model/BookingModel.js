const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'UserSchema', require: true},
    class: {type: Schema.Types.ObjectId, ref: 'ClassesSchema', require: true},
    instructor: {type: String, required: true},
    date: {type: Date, require: true},
    time: {type: Number, required: true},
    status: {type: String, required: true}
});

module.exports = mongoose.model('BookingSchema', BookingSchema);