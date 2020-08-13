const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
    class: {type: Schema.Types.ObjectId, ref: 'ClassesSchema', require: true},
    classDay: {type: Date, require: true},
    classTime: {type: Number, require: true},
    instructor: {type: Schema.Types.ObjectId, ref: 'InstructorSchema', require: true},
    repeat: {type: Boolean, required}
});

module.exports = mongoose.model('ScheduleSchema', ScheduleSchema);