const User = require('../models/user.js')

const index = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}

const show = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}

module.exports = {
    index,
    show,
}