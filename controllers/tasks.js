const Task = require('../models/Task.js')

const create = async (req, res) => {
    try {
        req.body.eventId = req.params.eventId
        const task = await Task.create(req.body)
        res.status(201).json(task)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}


const index = async (req, res) => {
    try{
        const tasks = await Task.find({ eventId: req.params.eventId })
        .populate('eventId')
        .sort({ createdAt: 'desc' })
        res.status(200).json(tasks)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}


module.exports = {
    create,
    index,
}