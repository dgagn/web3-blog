import React, {useCallback, useEffect, useState} from 'react';
import IconCircle from './icon-circle';
import FormInput from './form-input';
import FormTextArea from './form-textarea';
import SpinnerButton from './spinner-button';

function Modal({
  open,
  setOpen,
  title,
  description,
  onSubmit,
  isLoading,
  setTitle,
  setBody,
}) {
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
            ✏️
          </span>{' '}
          Modifier l&apos;article
        </h3>
        <p className="mt-sm">
          Les modifications à l&apos;article sont définitive.
        </p>
        <FormInput
          className="pt-md mb-lg"
          id="modify_title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        >
          Modifier le titre
        </FormInput>
        <FormTextArea
          id="modify_body"
          value={description}
          onChange={e => setBody(e.target.value)}
        >
          Modifier le contenu
        </FormTextArea>
        <SpinnerButton isLoading={isLoading}>Modifier</SpinnerButton>
      </div>
    </form>
  ) : null;
}

export default Modal;
