require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const Note = require('./models/note')
app.use(express.static('build'))
app.use(express.json())
app.use(cors())

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2020-01-10T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2020-01-10T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2020-01-10T19:20:14.298Z",
      important: true
    }
  ]

app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes.map(note => note.toJSON()))
    })
})

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
        res.json(note)
    }
    else {
        res.status(404).end()
    } 
})

app.delete('/api/notes/:id', (req, res) => {
    Note.findById(request.params.id).then(note => {
        res.json(note.toJSON())
    })
})

app.post('/api/notes', (req, res) => {
    const body = req.body

    if (body.content === null) {
        return (res.status(400).json({
            error: 'content missing'
        }))
    }

    const note = new Note ({
        content: body.content,
        important: body.important || false,
        date : new Date(),
        // id: generateId(),
    })

    note.save().then(savedNote => {
        res.json(savedNote.toJSON())
    })
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({
        error: 'unknown endpoint'
    })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
