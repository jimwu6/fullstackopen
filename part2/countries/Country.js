import React from 'react'


const Country = ({ countryData }) => {
    return (
        <div>
            <h2> {countryData.name} </h2>
            <p>capital {countryData.capital} </p>
            <p>population {countryData.population}</p>

            <h3>languages</h3>
            {console.log(countryData.languages)}
            <ul> 
                {countryData.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
            </ul>
            <img src={countryData.flag} alt='flag'/>
        </div>
    )
}

export default Country