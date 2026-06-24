import React from 'react';

const Chip = ({ status = 'default', children }) => {
  const statusClasses = {
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    error: "bg-red-50 text-red-700 border-red-200",
    default: "bg-gray-100 text-gray-700 border-gray-200"
  };

  return (
    <div className={`inline-flex items-center border rounded-none px-2.5 py-0.5 text-xs font-medium ${statusClasses[status]}`}>
      {children}
    </div>
  );
};

export default Chip;
