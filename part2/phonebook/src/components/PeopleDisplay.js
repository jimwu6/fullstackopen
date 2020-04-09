import React from 'react'

const personMap = (person, deletePerson) => {
    return (
        <div key={person.id}>
            <div>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button></div>
        </div>
    )
}

const PeopleDisplay = ( {peopleToShow, deletePerson} ) => {
    return (
        <>
            {peopleToShow.map(person => personMap(person, deletePerson))}
        </>
    )
}

export default PeopleDisplay