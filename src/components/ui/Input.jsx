import React from 'react';

/**
 * A reusable Input component.
 * * @param {Object} props
 * @param {string} props.label - The label for the input.
 * @param {string} [props.placeholder] - Placeholder text.
 * @param {string} [props.type='text'] - Input type (text, email, password, etc.).
 * @param {string} props.value - The current value of the input.
 * @param {Function} props.onChange - Change handler function.
 * @param {string} [props.error] - Error message to display.
 */
const Input = ({ label, placeholder, type = 'text', value, onChange, error }) => {
  return (
    <div className="w-full mb-4">
      {label && <label className="block text-sm font-bold text-slate-700 mb-1">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full h-12 px-4 rounded-lg border-2 outline-none transition-colors 
          ${error ? 'border-red-500 focus:border-red-600' : 'border-slate-200 focus:border-slate-800'}`}
      />
      {error && <span className="text-xs text-red-500 mt-1 block">{error}</span>}
    </div>
  );
};

export default Input;