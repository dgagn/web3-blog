export default class ArticleModel {
  constructor(article) {
    this.article = article;
  }

  getBody() {
    return this.article?.body;
  }

  getUser() {
    return this.article?.user_id;
  }

  getShortBody() {
    const splitBody = this.article.body.split(' ');
    return splitBody.length > 50
      ? splitBody.slice(0, 50).join(' ') + '...'
      : this.article.body;
  }

  getDate() {
    return this.article?.created_at.substr(0, 11);
  }

  getId() {
    return this.article?.id;
  }

  getTitle() {
    return this.article?.title;
  }
}
