import React, {useEffect, useState} from 'react';
import Article from '../components/article';
import {useHandleAsync} from '../context/auth';
import {getArticlesAtPage} from '../services/article';
import Loading from './loading';
import ErrorPage from './error';

function ArticlesPage() {
  const {data, run, isLoading, isSuccess, isError, error} = useHandleAsync();

  useEffect(() => {
    run(getArticlesAtPage(1));
  }, []);

  if (isLoading) return <Loading />;
  else if (isError) return <ErrorPage error={error} />;

  return (
    <div className="articles container max-w-md">
      {isSuccess
        ? data.data.map(article => {
            const splitBody = article.body.split(' ');
            const body =
              splitBody.length > 50
                ? splitBody.slice(0, 50).join(' ') + '...'
                : article.body;
            return (
              <Article
                key={article.id}
                date={article.created_at.substr(0, 11)}
                description={body}
                title={article.title}
              />
            );
          })
        : null}
    </div>
  );
}

export default ArticlesPage;
