import React from 'react';
import ArrowPointing from './arrow-pointing';

/**
 * The article format.
 *
 * @return {JSX.Element} the article
 */
function Article({title, date, description}) {
  return (
    <article className="article">
      <p className="article__date mt-sm mb-sm">{date}</p>
      <div className="article__heading">
        <h1 className="article__title">{title}</h1>
        <p className="article__description">{description}</p>
      </div>
      <div className="article__controls">
        <ArrowPointing />
      </div>
    </article>
  );
}

export default Article;
