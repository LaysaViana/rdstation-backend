// src/shared/Checkbox.jsx
import React, { forwardRef } from 'react';
import clsx from 'clsx';

export const Checkbox = forwardRef(function Checkbox(
  {
    id,
    name,
    checked = false,
    onChange,
    disabled = false,
    className = '',
    inputClassName = '',
    ...props
  },
  ref
) {
  return (
    <label
      htmlFor={id}
      className={clsx('checkbox-root', className, { 'is-disabled': disabled })}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
    >
      <input
        id={id}
        name={name}
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={clsx('checkbox', inputClassName)}
        {...props}
      />
    </label>
  );
});
