import React from 'react'

const Filter = ( {searchTerm, handleSearchChange}) => {
    return (
        <div>
            find countries <input value={searchTerm} onChange={handleSearchChange} ></input>
        </div>
    )
}

export default Filter