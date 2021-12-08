import React, {useMemo} from 'react';

function FormInput({
  type = 'text',
  id,
  children,
  className = 'mb-lg',
  error = '',
  isError = error !== '',
} = {}) {
  const inputClasses = useMemo(() => {
    return `form__control mt-xs ${isError ? 'form__control--error' : ``}`;
  }, [isError]);

  return (
    <div className={className + ' form__item '}>
      <label htmlFor={id}>{children}</label>
      <input type={type} id={id} className={inputClasses} required={true} />
      {isError && <div className="text-error-700 mt-xs">{error}</div>}
    </div>
  );
}

export default FormInput;
