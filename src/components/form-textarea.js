import React, {useMemo} from 'react';

function FormTextArea({
  id,
  children,
  className = 'mb-lg',
  value = undefined,
  onChange = undefined,
} = {}) {
  return (
    <div className={className + ' form__item '}>
      <label htmlFor={id}>{children}</label>
      <textarea
        id={id}
        className="form__control mt-xs max-h-md"
        required={true}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default FormTextArea;
