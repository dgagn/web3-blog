import React, {useCallback, useEffect, useState} from 'react';
import ArrowPointing from './arrow-pointing';
import Modal from './modal';
import {
  deleteArticle,
  getArticlesAtPage,
  getMyArticlesAtPage,
  modifyArticle,
} from '../services/article';
import useHandleAsync from '../hooks/use-handle-async';
import {globalEmitter} from '../emitter';
import {Link} from 'react-router-dom';
import ArticleModel from '../model/article-model';
import CloseModal from './close-modal';

function ArticleEdit({
  title,
  date,
  description,
  id,
  className,
  page,
  setData,
  setLoading,
}) {
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newBody, setNewBody] = useState(description);
  const [newnewBody, setNewnewBody] = useState(description);
  const [newnewTitle, setNewnewTitle] = useState(title);
  const {run, isLoading} = useHandleAsync();
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    setNewnewBody(new ArticleModel({body: description}).getShortBody());
  }, [description]);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if ((newTitle === title && newBody === description) || isLoading) return;
      run(modifyArticle(id, {id, title: newTitle, body: newBody})).then(() => {
        const art = new ArticleModel({title: newTitle, body: newBody, id});
        setNewnewBody(art.getShortBody());
        setNewnewTitle(art.getTitle());
        setOpen(state => !state);
        globalEmitter.emit('edit-article', {title: art.getTitle(), old: title});
      });
    },
    [description, id, isLoading, newBody, newTitle, run, title],
  );

  const onCloseSubmit = useCallback(
    e => {
      e.preventDefault();
      if (isLoading) return;
      run(deleteArticle(id)).then(() => {
        globalEmitter.emit('delete-article', title);
        setDeleteOpen(state => !state);
        setLoading(true);
        getMyArticlesAtPage(page).then(articles => {
          setLoading(false);
          setData(articles);
        });
      });
    },
    [id, isLoading, page, run, setData, setLoading, title],
  );

  return (
    <>
      <Modal
        onSubmit={onSubmit}
        title={newTitle}
        setTitle={setNewTitle}
        setBody={setNewBody}
        description={newBody}
        open={open}
        setOpen={setOpen}
        isLoading={isLoading}
      />
      <CloseModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        onSubmit={onCloseSubmit}
        isLoading={isLoading}
      />
      <article className={'article ' + className}>
        <p className="article__date mt-sm mb-sm">{date}</p>
        <div className="article__heading">
          <Link to={`/my-articles/${id}?from=${page}`}>
            <h1 className="article__title">{newnewTitle}</h1>
            <p className="article__description">{newnewBody}</p>
          </Link>
          <div className="flex gap-sm mt-lg">
            <button onClick={() => setOpen(state => !state)} className="link">
              Editer
            </button>
            <button
              onClick={() => setDeleteOpen(state => !state)}
              className="link link--danger"
            >
              Supprimer
            </button>
          </div>
        </div>
        <div className="article__controls">
          <ArrowPointing />
        </div>
      </article>
    </>
  );
}

export default ArticleEdit;
