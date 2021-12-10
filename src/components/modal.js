import React, {useState} from 'react';
import IconCircle from './icon-circle';

function Modal() {
  const [isOpen, setIsOpen] = useState(true);
  return isOpen ? (
    <div className="modal">
      <div className="content rounded relative p-sm@!sm">
        <IconCircle
          className="absolute top-lg right-xl pointer"
          color="error"
          onClick={() => setIsOpen(state => !state)}
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
      </div>
    </div>
  ) : null;
}

export default Modal;
