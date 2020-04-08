import React from 'react'

const SearchResults = ({results}) => {
    console.log(results)

    if (results === null) {
        return <p>Enter a query</p>
    }

    if (results === undefined) {
        return <p>Too many matches, specify another filter</p>
    }

    if (results.props === undefined) {
        return <p>Props are undefined</p>
    }

    if (results.props.countryData === undefined) {
        return <div id="countryInfo">{results}</div>
    }
    return  (
        <div>
            <div id='countryInfo'>{results}</div>
        </div>
    )
}

export default SearchResults