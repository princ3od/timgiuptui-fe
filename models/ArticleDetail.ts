
interface ArticleDetail  {
    id: string;
    accessedDate: string;
    author: string;
    content: string;
    date: string;
    description: string;
    domain: string;
    readTimeMinutes: number;
    similarArticles: Array<ArticleDetail>;
    source: string;
    thumbnail: string;
    title: string;
    topic: Array<string>;
    url: string;

}

export default ArticleDetail;