import React from 'react';
import IconCircle from './icon-circle';
import SpinnerButton from './spinner-button';

function CloseModal({open, setOpen, onSubmit, isLoading}) {
  return open ? (
    <form className="modal" onSubmit={onSubmit}>
      <div className="content rounded relative p-sm@!sm">
        <IconCircle
          className="absolute top-lg right-xl pointer"
          color="error"
          onClick={() => setOpen(state => !state)}
        >
          𝑥
        </IconCircle>
        <h3 className="mt-sm">
          <span role="img" aria-label="emoji pour un étoile">
            🚨
          </span>{' '}
          Supprimer l&apos;article !
        </h3>
        <p className="mt-sm">
          Supprimer l&apos;article est une action irréversible !
        </p>
        <SpinnerButton isLoading={isLoading} className="bg-error-700">
          Supprimer
        </SpinnerButton>
      </div>
    </form>
  ) : null;
}

export default CloseModal;
