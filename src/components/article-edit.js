import React from 'react';
import ArrowPointing from './arrow-pointing';

function ArticleEdit({title, date, description}) {
  return (
    <article className="article">
      <p className="article__date mt-sm mb-sm">{date}</p>
      <div className="article__heading">
        <h1 className="article__title">{title}</h1>
        <p className="article__description">{description}</p>
        <div className="flex gap-sm mt-lg">
          <button className="link">Editer</button>
          <button className="link link--danger">Supprimer</button>
        </div>
      </div>
      <div className="article__controls">
        <ArrowPointing />
      </div>
    </article>
  );
}

export default ArticleEdit;
