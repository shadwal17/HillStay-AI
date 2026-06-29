import React from 'react';

/**
 * A reusable Button component.
 * * @param {Object} props
 * @param {'primary' | 'secondary' | 'outline'} [props.variant='primary'] - The visual style of the button.
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - The size of the button.
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 * @param {Function} [props.onClick] - Click handler function.
 * @param {React.ReactNode} props.children - The button content.
 */
const Button = ({ variant = 'primary', size = 'md', disabled = false, onClick, children }) => {
  const baseStyles = "font-bold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-slate-800 text-white hover:bg-slate-700 focus:ring-slate-800",
    secondary: "bg-slate-200 text-slate-800 hover:bg-slate-300 focus:ring-slate-300",
    outline: "border-2 border-slate-300 text-slate-700 hover:border-slate-800 focus:ring-slate-400"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
};

export default Button;