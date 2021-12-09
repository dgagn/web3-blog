import axiosClient from './api';

export async function getArticlesAtPage(page) {
  return (await axiosClient.get('articles?page=' + encodeURI(page))).data;
}

export async function getArticle(articleId) {
  return (await axiosClient.get(`articles/${articleId}`)).data;
}
