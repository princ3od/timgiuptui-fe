
interface Article  {
    id: string;
    title: string;
    url: string;
    topic: string;
    source: string;
    description: string;
    thumbnail: string;
    date: string;
    relatedArticles: Array<Article>;
    timeReadMinutes: number;
}

export default Article;