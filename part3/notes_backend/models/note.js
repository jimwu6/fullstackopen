const mongoose = require('mongoose')

// const url = `mongodb+srv://fullstack:abcd1234@cluster0-nwfxj.mongodb.net/note-app?retryWrites=true&w=majority`
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => {
        console.log('connected to mongodb')
    })
    .catch(error => {
        console.log('error connecting to mongodb', error.message)
    })

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)