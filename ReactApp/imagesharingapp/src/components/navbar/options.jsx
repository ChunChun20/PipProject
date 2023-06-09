import React, { useState } from 'react';
import "./options.scss"

const DropdownMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Implement your logout logic here
  };

  const handleChangePhoto = () => {
    // Implement your change photo logic here
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={handleDropdownToggle}>
        User's Username
      </button>
      {isDropdownOpen && (
        <ul className="dropdown-menu">
            <li>
            <button onClick={() => navigate(`/profile/${username}`)}>View Profile</button>
        </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
          <li>
            <button onClick={handleChangePhoto}>Change Photo</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
