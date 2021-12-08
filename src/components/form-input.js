import React from 'react';

function FormInput({ type = 'text', id, children } = {}) {
  return (
    <div className="form__item mb-lg">
      <label htmlFor={id}>
        {children}
      </label>
      <input type={type} id={id} className="form__control mt-xs" required={true} />
    </div>
  );
}

export default FormInput;
