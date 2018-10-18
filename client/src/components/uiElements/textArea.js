import React from 'react';

const textArea = (fieldLabel, fieldName, value, handleChange) => (
  <div className="field">
    <label className="label" htmlFor={fieldName}>{fieldLabel}</label>
    {value !== null && (
      <div className="control">
        <textarea
          className="textarea"
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

export default textArea;
