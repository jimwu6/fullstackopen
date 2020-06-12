import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Country from './components/Country'
import CountryList from './components/CountryList'
import SearchResults from './components/SearchResults'

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ searchTerm, setSearchTerm ] = useState('')

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data.filter(c => c.capital !== ''))
    })
  }, [])

  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
  }

  const handleButtonClick = event => {
    setSearchTerm(event.target.previousSibling.textContent.toLowerCase())
  }

  const countriesToShow = () => {
    // no countries
    let result = <div>Loading...</div>
    if (countries.length > 0) {
      // no search term
      if (searchTerm === '') return null

      result = ''
      // const countries1 = countries.filter(country => (country.name).toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
      const countries1 = countries.filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()))
      // too many countries
      if (countries1.length > 10) {
        // result = [{name: 'too many matches, specify another fiter', id: 0}]
        result = undefined
      } 

      //  1 country
      else if (countries1.length === 1) {
        result = <Country countryData={countries1[0]} />
      }
      // 2-10 countries
      else {
        result = (
          <CountryList countries={countries1} handleButtonClick={handleButtonClick} />
        )
      }
    }
    return result
  }

  return (
    <div>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <SearchResults results={countriesToShow()} />
    </div>
  )
}

export default App