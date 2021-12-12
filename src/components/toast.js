import React, {useCallback, useState} from 'react';
import {Toast} from 'react-bootstrap';
import {globalEmitter} from '../emitter';

/**
 * The blog toast component that uses bootstrap toasts.
 *
 * @return {JSX.Element} the blog toast component
 * @constructor
 */
function BlogPopup() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const toggle = useCallback(() => setShow(show => !show), []);
  const [body, setBody] = useState('');

  globalEmitter.on('registered', credentials => {
    setTitle(credentials.name);
    setBody(`Félicitation ${credentials.name}, votre compte à bien été créer!`);
    setShow(true);
  });

  globalEmitter.on('created-article', article => {
    setTitle(article?.title);
    setBody(`${article?.title} à bien été créer!`);
    setShow(true);
  });

  globalEmitter.on('edit-article', ({old, title}) => {
    setTitle(title);
    setBody(`${old} à bien été modifié${old !== title ? ' à ' + title : ''} !`);
    setShow(true);
  });

  globalEmitter.on('delete-article', title => {
    setTitle(title);
    setBody(`L’article « ${title} » a bien été supprimé.`);
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

export default BlogPopup;
