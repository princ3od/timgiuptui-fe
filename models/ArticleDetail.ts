
interface ArticleDetail  {
    id: String;
    accessedDate: String;
    author: String;
    content: String;
    date: String;
    description: String;
    domain: String;
    readTimeMinutes: Number;
    similarArticles: Array<ArticleDetail>;
    source: String;
    thumbnail: String;
    title: String;
    topic: Array<String>;
    url: String;

}

export default ArticleDetail;