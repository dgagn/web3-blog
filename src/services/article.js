import axiosClient from './api';

/**
 * Get all articles at a given page.
 *
 * @param {*} page the page to fetch articles
 * @return {Promise<any>} all articles at a given page
 */
export async function getArticlesAtPage(page) {
  return (await axiosClient.get('articles?page=' + encodeURI(page))).data;
}

/**
 * Get all of my articles at a given page.
 *
 * @param {*} page the page
 * @return {Promise<any>} all of my articles at a given page
 */
export async function getMyArticlesAtPage(page) {
  return (await axiosClient.get('articles/editable?page=' + encodeURI(page)))
    .data;
}

/**
 * Gets a single article with an id.
 *
 * @param {number} articleId the article id to fetch
 * @return {Promise<any>} a single article with an id.
 */
export async function getArticle(articleId) {
  return (await axiosClient.get(`articles/${articleId}`)).data;
}

/**
 * Invalidates the cache at a certain endpoint.
 *
 * @param {*} endpoint the endpoint to invalidate
 */
function invalidateCache(endpoint) {
  for (const key in sessionStorage) {
    if (key.includes(endpoint)) {
      sessionStorage.removeItem(key);
    }
  }
}

/**
 * Creates an article.
 *
 * @param {*} article the article to create
 * @return {Promise<any>} the response of the creation of the article
 */
export async function createArticle(article) {
  invalidateCache('articles');
  return (await axiosClient.post(`articles`, article)).data;
}

/**
 * Modify an article.
 * @param {*} id the id of the modified article
 * @param {*} modified the modified article
 * @return {Promise<any>} the modified article
 */
export async function modifyArticle(id, modified) {
  invalidateCache('articles');
  return (await axiosClient.put(`articles`, modified)).data;
}

/**
 * The delete article functionality.
 *
 * @param {number} id the id to delete
 * @return {Promise<any>} the response of the deleted article
 */
export async function deleteArticle(id) {
  invalidateCache('articles');
  return (await axiosClient.delete(`articles/${id}`)).data;
}
