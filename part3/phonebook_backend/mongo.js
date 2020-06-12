const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('supply password')
    process.exit(1)
}

password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0-nwfxj.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})

const personSchema = new mongoose.Schema({
    name : String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3) {
    console.log('Phonebook')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}

else {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name: name,
        number: number,
    })
    
    person.save().then(res => {
        console.log('person saved')
        mongoose.connection.close()
    })
}