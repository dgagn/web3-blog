import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

/**
 * The loading full page.
 *
 * @return {JSX.Element} the loading full page
 * @constructor
 */
function Loading() {
  return (
    <div className="spinner-container">
      <Spinner className="spinner" animation="grow" variant="dark" />
    </div>
  );
}

export default Loading;
