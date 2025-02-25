import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
      setQuery("");
    }
  };

  return (
    <div className='search-container'>
      <input type='text' value={query} onChange={handleInputChange} placeholder='Search...' />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
