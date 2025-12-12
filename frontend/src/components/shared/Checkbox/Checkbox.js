// src/shared/Checkbox.jsx
import React from 'react';

function Checkbox({
  type = 'checkbox',
  checked,
  onChange,
  className = '',
  ...props
}) {
  return (
    <input
      {...props}
      type={type}
      checked={checked}
      onChange={onChange}
      style={{ accentColor: 'var(--accent-1)' }}
      className={`
    ${type === 'radio' ? 'form-radio' : 'form-checkbox'}
    h-4 w-4
    cursor-pointer
    ${className}
  `}
    />
  );
}

export default Checkbox;
