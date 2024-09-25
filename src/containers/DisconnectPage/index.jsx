import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import './DisconnectPage.scss'; // Import your SCSS file
import { useNavigate } from 'react-router-dom';

const DisconnectPage = () => {
  const navigate = useNavigate();


  useEffect(() => {
    const handleOnline = () => {
      toast.success("You are back online!");
    };

    const handleOffline = () => {
      toast.error("You are disconnected");
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [navigate]);

  const handleRetry = () => {
    if (navigator.onLine) {
      toast.success("You are back online!");
      navigate(-1);
    } else {
      toast.error("Still disconnected. Please check your connection.");
    }
  };

  return (
    <div className="disconnect-container">
      <div className="disconnect-content">
        <h1 className="disconnect-title">Disconnected</h1>
        <p className="disconnect-message">
          It seems you have lost your internet connection. Please check your network settings and try again.
        </p>
        <button className="retry-button" onClick={handleRetry}>
          Retry Connection And Go Home Page
        </button>
      </div>
      <ToastContainer /> {/* ToastContainer must be included to display toasts */}
    </div>
  );
};

export default DisconnectPage;
