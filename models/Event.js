const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    package: {
        type: String,
        enum: ['Gold', 'Silver', 'Bronze'],
        required: true,
    },
}, { timestamps: true })

const Event = mongoose.model('Event', eventSchema)
module.exports = Event