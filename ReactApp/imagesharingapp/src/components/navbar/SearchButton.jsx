import React, { useState } from 'react';

const SearchButton = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleSearchButtonClick = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <div>
      {!isSearchVisible && (
        <button onClick={handleSearchButtonClick}>Search</button>
      )}
      {isSearchVisible && (
        <div>
          <input type="text" placeholder="Enter your search query" />
          <button onClick={handleSearchButtonClick}>Close</button>
        </div>
      )}
    </div>
  );
};

export default SearchButton;
