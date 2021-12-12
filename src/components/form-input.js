import React, {useMemo} from 'react';

/**
 * The form input.
 *
 * @return {JSX.Element} a form input
 * @constructor
 */
function FormInput({
  type = 'text',
  id,
  children,
  className = 'mb-lg',
  error = '',
  isError = error !== '',
  value = undefined,
  onChange = undefined,
} = {}) {
  const inputClasses = useMemo(() => {
    return `form__control mt-xs ${isError ? 'form__control--error' : ``}`;
  }, [isError]);

  return (
    <div className={className + ' form__item '}>
      <label htmlFor={id}>{children}</label>
      <input
        type={type}
        id={id}
        className={inputClasses}
        required={true}
        value={value}
        onChange={onChange}
      />
      {isError && <div className="text-error-700 mt-xs">{error}</div>}
    </div>
  );
}

export default FormInput;
