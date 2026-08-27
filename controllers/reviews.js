const Review = require('../models/Review.js')

const create = async (req, res) => {
    try {
        req.body.eventId = req.params.eventId
        req.body.userId = req.user._id
        const review = await Review.create(req.body)
        review._doc.userId = req.user
        res.status(201).json(review)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}


module.exports = {
    create,
}