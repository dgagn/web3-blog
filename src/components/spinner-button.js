import React from 'react';
import Spinner from "react-bootstrap/Spinner";

function SpinnerButton({ isLoading, children, type = 'submit' }) {
  return (
    <button type={type} className="button connexion__btn mt-xl">
      {isLoading ? <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner> : children}
    </button>
  );
}

export default SpinnerButton;
