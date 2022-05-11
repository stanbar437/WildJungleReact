import React from 'react'

function SearchBar(props) {
  const { searchWord, setSearchWord } = props
  return (
    <>
      <div className="inputwithIcon">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <i className="fas fa-search"></i>
      </div>
    </>
  )
}

export default SearchBar
