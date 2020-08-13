const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'UserSchema', require: true},
    notification: {type: String, required: true},
    dateTime: {type: Date, default: Date.now }
});

module.exports = mongoose.model('NotificationSchema', NotificationSchema);