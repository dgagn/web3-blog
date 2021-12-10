import React, {useMemo} from 'react';

function FormTextArea({id, children, className = 'mb-lg'} = {}) {
  return (
    <div className={className + ' form__item '}>
      <label htmlFor={id}>{children}</label>
      <textarea id={id} className="form__control mt-xs" required={true} />
    </div>
  );
}

export default FormTextArea;
