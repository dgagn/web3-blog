import React, {useEffect, useState} from 'react';
import Article from '../components/article';
import {useHandleAsync} from '../context/auth';
import {getArticlesAtPage} from '../services/article';
import Loading from './loading';
import ErrorPage from './error';
import {Link, useLocation} from 'react-router-dom';

function ArticlesPage() {
  const {data, run, isLoading, isSuccess, isError, error, isIdle} =
    useHandleAsync();
  const location = useLocation();
  const [pageNumber, setPageNumber] = useState(undefined);

  useEffect(() => {
    if (!pageNumber) return;
    run(getArticlesAtPage(pageNumber));
  }, [pageNumber, run]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    const numberPage = Number(page);
    const validPageNumber =
      numberPage <= 0 || Number.isNaN(numberPage) ? 1 : numberPage;
    setPageNumber(validPageNumber);
  }, [location.search]);

  if (isLoading || isIdle) return <Loading />;
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
              <Link
                to={`/articles/${article.id}?from=${pageNumber}`}
                key={article.id}
              >
                <Article
                  date={article.created_at.substr(0, 11)}
                  description={body}
                  title={article.title}
                />
              </Link>
            );
          })
        : null}
    </div>
  );
}

export default ArticlesPage;
