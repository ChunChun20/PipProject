import React, { useState } from 'react';
import "./ShareButton.scss"
import share from '../../assets/share.png'

const ShareButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleShare = (platform) => {
    let shareUrl = '';

    // Set the share URL based on the selected social media platform
    switch (platform) {
      case 'Facebook':
        shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=https://example.com';
        break;
      case 'Twitter':
        shareUrl = 'https://twitter.com/share?url=https://example.com&text=Check out this content!';
        break;
      case 'Instagram':
        shareUrl = 'https://www.instagram.com/';
        break;
      // Add more cases for other social media platforms
      default:
        break;
    }

    // Open the share URL in a new window or tab
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  const handleMenuItemClick = (platform) => {
    handleShare(platform);
    setIsMenuOpen(false);
  };

  return (
    <div>
    <img className='share' src={share} alt="share" onClick={handleButtonClick} />
      {isMenuOpen && (
        <div className="bubble-menu">
          <button onClick={() => handleMenuItemClick('Facebook')}>Facebook</button>
          <button onClick={() => handleMenuItemClick('Twitter')}>Twitter</button>
          <button onClick={() => handleMenuItemClick('Instagram')}>Instagram</button>
          {/* Add more social media buttons here */}
        </div>
      )}
    </div>
  );
};

export default ShareButton;
