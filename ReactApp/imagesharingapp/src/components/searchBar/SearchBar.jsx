import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

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
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default SearchBar