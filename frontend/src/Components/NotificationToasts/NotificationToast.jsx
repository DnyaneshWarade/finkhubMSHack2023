import React, { useEffect, useState } from 'react';
import './NotificationToast.css';

export default function NotificationToast({ message, onClose }) {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
      setIsVisible(false);
      onClose();
    };
    
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose(); // Close the toast after 5 seconds
    }, 5000);

    // Clear the timer if the component unmounts or onClose is called manually
    return () => clearTimeout(timer);
  }, []);
  
    return (
      isVisible && (
        <div className="notification-toast">
          <div className="toast-content">{message}</div>
          <button className="close-button" onClick={handleClose}>
            &times;
          </button>
        </div>
      )
    );
}
