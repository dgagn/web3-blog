import React from 'react';
import Article from '../components/article';
import {getArticlesAtPage} from '../services/article';
import {Link} from 'react-router-dom';
import useArticles from '../hooks/use-articles';
import Loading from './loading';
import ErrorPage from './error';

function ArticlesPage() {
  const {isSuccess, articles, pageNumber, isError, isLoading, error} =
    useArticles(getArticlesAtPage);
  if (isLoading) return <Loading />;
  else if (isError) return <ErrorPage error={error} />;
  return (
    <div className="articles container max-w-md">
      {isSuccess
        ? articles.map(article => {
            return (
              <Link
                to={`/articles/${article.getId()}?from=${pageNumber}`}
                key={article.getId()}
              >
                <Article
                  date={article.getDate()}
                  description={article.getShortBody()}
                  title={article.getTitle()}
                />
              </Link>
            );
          })
        : null}
    </div>
  );
}

export default ArticlesPage;
