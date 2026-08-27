const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    orderStatus: {
        type: String,
        enum: ['Pending', 'In Progress', 'Confirmed', 'Completed'],
        default: 'pending',
    },
}, { timestamps: true })

const Task = mongoose.model('Task', taskSchema)
module.exports = Task