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

const show = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId).populate("user")
        res.status(200).json(event)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}

const update = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId)

        if (!event.user.equals(req.user._id)) {
            return res.status(403).send("You're not allowed to do that!")
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.eventId,
            req.body,
            { new: true }
        )

        updatedEvent._doc.user = req.user

        res.status(200).json(updatedEvent)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}

const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId)

        if (!event.user.equals(req.user._id)) {
            return res.status(403).send("You're not allowed to do that!")
        }

        const deletedEvent = await Event.findByIdAndDelete(req.params.eventId)
        res.status(200).json(deletedEvent)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }

}

 module.exports = {
    create, 
    index, 
    show,
    update,
    deleteEvent,
 }