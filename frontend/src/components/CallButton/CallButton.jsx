import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import './CallButton.css';

const CallButton = () => {
  const phoneNumber = '9278346641'; 
  const telUrl = `tel:${phoneNumber}`;

  return (
    <a
      href={telUrl}
      className="call-button"
      aria-label="Call us"
    >
      <FaPhoneAlt className="call-icon" />
    </a>
  );
};

export default CallButton;