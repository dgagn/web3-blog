import {truncate} from './model';

/**
 * A model of the article.
 */
export default class ArticleModel {
  /**
   * The constructor.
   *
   * @param {*} article the article response
   */
  constructor(article) {
    this.article = article;
  }

  /**
   * Returns the body.
   *
   * @return {*} the body of the article
   */
  getBody() {
    return this.article?.body;
  }

  /**
   * Returns the user.
   *
   * @return {*} the user_id
   */
  getUser() {
    return this.article?.user_id;
  }

  /**
   * Returns the short body.
   *
   * @return {string|*} the short body
   */
  getShortBody() {
    return truncate(50, this.article.body);
  }

  /**
   * Returns the article date.
   *
   * @return {string | undefined} the article date
   */
  getDate() {
    return this.article?.created_at.substr(0, 11);
  }

  /**
   * Returns the article id
   * @return {*}
   */
  getId() {
    return this.article?.id;
  }

  /**
   * Returns the article title
   * @return {*}
   */
  getTitle() {
    return this.article?.title;
  }
}
