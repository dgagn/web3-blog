import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

/**
 * The spinner that uses react-bootstrap
 *
 * @return {JSX.Element} a spinner that uses react-bootstrap
 * @constructor
 */
function SpinnerButton({isLoading, children, type = 'submit', className}) {
  return (
    <button type={type} className={'button connexion__btn mt-xl ' + className}>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        children
      )}
    </button>
  );
}

export default SpinnerButton;
