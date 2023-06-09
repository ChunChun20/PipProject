import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import "./SearchBar.scss"
import iconsearch from '../../assets/iconsearch.png'

const SearchBar = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        // Navigate to the profile page of the entered username
        navigate(`/profile/${username}`);
    };

    return (
        <div>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
                    {/* <img class='iconsearch' src={iconsearch} alt="iconsearch" onClick={handleSearch}/>            */}
                   <button class="searchButton"onClick={handleSearch}>search</button>
        </div>
    );
}

export default SearchBar