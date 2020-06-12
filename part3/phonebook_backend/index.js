require('dotenv').config()
const express = require('express')

const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(express.json())
app.use(cors(0))

morgan.token('postdata', (req, res) => {
    if (res.statusCode === 200) {
        return(JSON.stringify(req.body))
    }
    return ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postdata'))

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    }
]

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons  => {
        res.json(persons.map(person => person.toJSON()))
    })
})

app.get('/info', (req, res) => {
    const p = `<p> Phonebook has info for ${persons.length} people </p>
                <p>${new Date()}</p>`
    res.send(p)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {   
        res.json(person)
    }
    else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)

    persons.filter(p => p.id !== id)

    res.status(204).end()
})

app.post('/api/persons/', (req, res) => {
    const body = req.body

    if (!body.name) {
        return (res.status(400).json({
            error: 'name is missing'
        }))
    }
    if (!body.number) {
        return (res.status(400).json({
            error: 'number is missing'
        }))
    }
    if (persons.find(p => p.name === body.name)) {
        return (res.status(400).json({
            error: 'name must be unique'
        }))
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random()*1000)
    }

    persons.concat(person)
    res.json(person)
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({
        error: 'unknown endpoint'
    })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
})