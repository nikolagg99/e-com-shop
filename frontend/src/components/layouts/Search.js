import React, { useState } from 'react'

const Search = ({ history }) => {

    const [keyword, setKeyword] = useState('');

    const searchHandler = (e) => {
        e.preventDefault();

        if(keyword) {
            history.push('/')
            history.push(`search/${keyword}`)
        } else {
            history.push('/')
        }
    }

    return (
            <form onSubmit={ searchHandler }>
                <div className="input-gorup row m-auto">
                        <input 
                            type="text"
                            id="search_field"
                            className="form-control search-field"
                            placeholder="Product name...."
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <div className="input-group-append search-button">
                            <button id="search_btn" className="btn ml-2">
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
            </form>
    )
}

export default Search
