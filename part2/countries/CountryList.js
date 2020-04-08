import React from 'react'


const CountryList = ({countries, handleButtonClick}) => {
    
    return (
        countries.map(country => (
            <div key={country.name}>
                {country.name}
                <button onClick={handleButtonClick}>Show</button>
            </div>
        ))
    )

}

export default CountryList