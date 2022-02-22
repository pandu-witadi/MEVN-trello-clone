//
//
//
const Board = require('../models/Boards')


const find = async (req, res) => {
    let { ownerId } = req.query

    if ( !ownerId )
        return res.json({ errors: "parameters incomplete" })

    try {
        let boards = await Board.find({ ownerId: ownerId })
        return res.status(200).json(boards)
    } catch (err) {
        return res.json({ errors: err })
    }
}

const create = async (req, res) => {
    let { name, background } = req.body

    if ( !(name && background) )
        return res.json({ errors: "parameters incomplete" })

    try {
        let board = await Board.create({
            name: name,
            background: background,
            ownerId: req.userId
        })
        return res.status(200).json(board)
    } catch (err) {
        return res.json({ errors: err })
    }
}


module.exports = {
    find,
    create
}
