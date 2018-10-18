import React from 'react';

const textFeild = (fieldLabel, fieldName, value, handleChange) => (
  <div className="field">
    <label className="label" htmlFor={fieldName}>{fieldLabel}</label>
    {value !== null && (
      <div className="control">
        <input
          className="input"
          type="text"
          id={fieldName}
          placeholder={fieldLabel}
          name={fieldName}
          value={value}
          onChange={handleChange}
        />
      </div>
    )}
  </div>
);

export default textFeild;
