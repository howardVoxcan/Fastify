const { v4: uuidv4 } = require('uuid')
let items = require('../Items')

//item schema

const getItems = (req, reply) => {
    reply.send(items)
}

const getItem = (req, reply) => {
    const id = parseInt(req.params.id)
    const item = items.find(item => item.id === id)

    if (!item) {
        reply.status(404).send({ error: 'Item not found' })
        return 
    }
    reply.send(item)
}

const addItem = (req, reply) => {
    const { name } = req.body

    const item = {
        id: uuidv4(),
        name
    }

    items.push(item)
    reply.code(201).send(item)
}

const deleteItem = (req, reply) => {
    const id = parseInt(req.params.id)
    items = items.filter(item => item.id !== id)
    reply.send({ message: `Item ${id} deleted` })
}

const putItem = (req, reply) => {
    const id = parseInt(req.params.id)
    const { name } = req.body

    items = items.map(item => {
        if (item.id === id) {
            return { ...item, name }
        }
        return item
    })

    item = items.find(item => item.id === id)
    reply.send(item)
}

module.exports = {
    getItems,
    getItem,
    addItem,
    deleteItem,
    putItem
}