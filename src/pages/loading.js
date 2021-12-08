import React from 'react';
import Spinner from "react-bootstrap/Spinner";

function Loading() {
  return (
    <div className="spinner-container">
      <Spinner className="spinner" animation="grow" variant="dark" />
    </div>
  );
}

export default Loading;
