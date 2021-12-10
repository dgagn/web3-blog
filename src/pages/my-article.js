import React from 'react';
import {useNavigate} from 'react-router-dom';
import useArticle from '../hooks/use-article';
import NotFoundPage from './not-found';

function MyArticlePage() {
  const {currentArticle, isError, fromPage} = useArticle('articles/editable');
  const navigate = useNavigate();

  if (isError) {
    return <NotFoundPage />;
  }
  return (
    <>
      <div className="p-2xl text-center bg-contrast-900 clip">
        <div className="blur p-xl max-w-md mx-auto my-auto bg-blur">
          <h1 className="text-contrast-50">{currentArticle?.getTitle()}</h1>
          <p className="text-contrast-50">
            {currentArticle?.getDate()} — {currentArticle?.getUser()}
          </p>
        </div>
      </div>
      <div className="container max-w-md pt-xl">
        <p>{currentArticle?.getBody()}</p>
        <button
          className="link-fx-4 mt-lg"
          onClick={() => navigate(`/articles/editable?page=${fromPage}`)}
        >
          Retourner en arrière
        </button>
      </div>
    </>
  );
}

export default MyArticlePage;
