import React, {useCallback, useEffect} from 'react';
import FormInput from '../components/form-input';
import SpinnerButton from '../components/spinner-button';
import FormTextArea from '../components/form-textarea';
import useHandleAsync from '../hooks/use-handle-async';
import {createArticle} from '../services/article';
import {globalEmitter} from '../emitter';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';

/**
 * The creation of articles is here.
 *
 * @return {JSX.Element} the create article.
 * @constructor
 */
function MyArticlesCreate() {
  const {run, isLoading, isSuccess, data} = useHandleAsync();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && data) {
      globalEmitter.emit('created-article', data?.data);
      navigate('/my-articles');
    }
  }, [data, isSuccess, navigate]);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if (isLoading) return;
      const {
        title: {value: title},
        body: {value: body},
      } = e.target.elements;
      run(createArticle({title, body}));
    },
    [isLoading, run],
  );

  return (
    <div className="max-w-sm container-2xl connexion">
      <h1 className="connexion__title">Créer une article</h1>
      <p className="connexion__subtitle pt-sm">
        Voici la page qui vous permet de créer une article
      </p>
      <form className="container-lg max-w-sm mt-lg" onSubmit={onSubmit}>
        <FormInput id="title">Titre</FormInput>
        <FormTextArea id="body">Contenu</FormTextArea>
        <SpinnerButton className="mb-xl" isLoading={isLoading}>
          Créer
        </SpinnerButton>
        <Link className="link text-center block" to="/my-articles">
          Retour
        </Link>
      </form>
    </div>
  );
}

export default MyArticlesCreate;
