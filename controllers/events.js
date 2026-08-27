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

 module.exports = {
    create, 
 }