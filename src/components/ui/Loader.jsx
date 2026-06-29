import React from 'react';

/**
 * A reusable Loader/Spinner component.
 */
const Loader = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-800"></div>
    </div>
  );
};

export default Loader;