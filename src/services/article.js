import axiosClient from './api';

export async function getArticlesAtPage(page) {
  return (await axiosClient.get('articles?page=' + encodeURI(page))).data;
}

export async function getMyArticlesAtPage(page) {
  return (await axiosClient.get('articles/editable?page=' + encodeURI(page)))
    .data;
}

export async function getArticle(articleId) {
  return (await axiosClient.get(`articles/${articleId}`)).data;
}

function invalidateCache(endpoint) {
  for (const key in sessionStorage) {
    if (key.includes(endpoint)) {
      sessionStorage.removeItem(key);
    }
  }
}

export async function createArticle(article) {
  invalidateCache('articles');
  return (await axiosClient.post(`articles`, article)).data;
}

export async function modifyArticle(id, modified) {
  invalidateCache('articles');
  return (await axiosClient.put(`articles`, modified)).data;
}

export async function deleteArticle(id) {
  invalidateCache('articles');
  return (await axiosClient.delete(`articles/${id}`)).data;
}
