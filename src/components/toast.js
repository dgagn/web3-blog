import React, {useCallback, useState} from 'react';
import {Toast} from 'react-bootstrap';
import {emitterRegistration} from '../emitter';

function RegistrationPopup() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const toggle = useCallback(() => setShow(show => !show), []);
  const [body, setBody] = useState('');

  emitterRegistration.on('registered', credentials => {
    console.log(credentials);
    setTitle(credentials.name);
    setBody(`Félicitation ${credentials.name}, votre compte à bien été créer!`);
    setShow(true);
  });

  return (
    <Toast
      className="top-md left-md position-absolute bg-primary-100"
      show={show}
      autohide={true}
      onClose={toggle}
    >
      <Toast.Header>
        <strong className="mr-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body>{body}</Toast.Body>
    </Toast>
  );
}

export default RegistrationPopup;
