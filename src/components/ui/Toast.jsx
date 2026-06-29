import React, { useEffect, useState } from 'react';

/**
 * A reusable Toast notification component.
 * * @param {Object} props
 * @param {string} props.message - The message to display.
 * @param {boolean} props.isVisible - Controls visibility.
 * @param {Function} props.onClose - Function called when toast dismisses.
 */
const Toast = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto-dismiss after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-slate-800 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-bounce">
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
    </div>
  );
};

export default Toast;