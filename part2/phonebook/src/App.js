import React, { useState, useEffect } from 'react'

import PersonForm from './components/PersonForm'
import PeopleDisplay from './components/PeopleDisplay'
import Filter from './components/Filter'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
    const [ persons, setPersons ] = useState([])     
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')
    const [ searchTerm, setSearchTerm ] = useState('')
    const [ showAll, setShowAll ] = useState(true)
    const [ errorMessage, setErrorMessage ] = useState(null)
    const [ errorClass, setErrorClass ] = useState(null)

    useEffect(() => {
      personService
        .getAll()
        .then(initialPersons => setPersons(initialPersons))
    }, [])

    const setErrorSetting = (message, className) => {
      setErrorMessage(message)
      setErrorClass(className)
    }

    const addName = (event) => {
        event.preventDefault()
        
        // check if the object exists
        const found = persons.some(person => person.name === newName)

        if (!found && newName !== '') {
          const newNameObject = {
            name: newName,
            // id: persons.length+1,
            number: newNumber
          }
          
          personService.create(newNameObject).then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
          })
          setErrorSetting(`Added ${newName}`, 'success')
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
          setNewName('')
          setNewNumber('')
        }
        else if (newName !== ''){
          if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
            const foundPerson = persons.find(p => p.name === newName)
            const nP = {...foundPerson, number: newNumber}
            personService.update(foundPerson.id, nP).then(returnedPerson => {
              setPersons(persons.map(p => p.id !== nP.id ? p : nP))
              setErrorSetting(`Changed ${newName}`, 'success')
              setTimeout(() => {
                setErrorMessage(null)
              }, 3000)
              setNewName('')
              setNewNumber('')
            })
            .catch(error => {
              setErrorSetting(`Information of ${newName} has already been removed`, 'error')
              setTimeout(() => {
                setErrorMessage(null)
              }, 3000)
            })
          }
        }
    }

    const deletePerson = (id) => {
      // console.log
      const person = persons.find(p => p.id === id)
      if (window.confirm(`Delete ${person.name} ?`)) {
        // console.log(personService.deletePerson(id))
        setErrorSetting(`Deleted ${person.name}`, 'success')
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        personService.deleteId(id).then(() => {
            setPersons(persons.filter(p => p.id !== id))
          }
        )
      }
    }

    const peopleToShow = showAll ? persons : persons.filter( person =>(person.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1))

    const handleNameChange = (event) => {
      setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
    }

    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value)
      if(event.target.value === '') {
        setShowAll(true)
      }
      else {
        setShowAll(false)
      }
    }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} className={errorClass}/>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      <h2> add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      
      <h2>Numbers</h2>
      <PeopleDisplay peopleToShow={peopleToShow} deletePerson={deletePerson} />
    </div>
  )
}
  

export default App