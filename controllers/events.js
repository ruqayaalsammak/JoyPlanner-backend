 const Event = require('../models/Event')

 const create = async (req, res) => {
    try{
        req.body.user = req.user._id
        const newEvent = await Event.create(req.body)
        res.status(201).json(newEvent)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
 }

const index = async (req, res) => {
    try{
        const events = await Event.find({})
        .populate("user")
        .sort({ createdAt: "desc" })
        res.status(200).json(events)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}

 module.exports = {
    create, 
    index, 
 }