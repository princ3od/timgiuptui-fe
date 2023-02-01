import { type } from "os";



type Article = {
    id: String;
    accessedDate: String;
    author: String;
    content: String;
    date: String;
    description: String;
    domain: String;
    readTimeMinutes: Number;
    similarArticles: Array<Article>;
    source: String;
    thumbnail: String;
    title: String;
    topic: String;
    url: String;

}

export default Article;