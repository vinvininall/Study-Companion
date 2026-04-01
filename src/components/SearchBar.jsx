import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDebounce } from '../hooks/useDebounce';

const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return (
    <div className="search-bar">
      <FaSearch className="search-icon" />
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
