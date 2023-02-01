import Article from "model/article";

const article1:Article = {
    id: "1",
    accessedDate: "2020-01-01",
    author: "John Doe",
    content: "Incididunt culpa occaecat dolore consequat ut laboris tempor et labore laborum.",
    date: "2020-01-01",
    description: "lorem ipsum dolor sit amet",
    domain: "loremipsum.com",
    readTimeMinutes: 5,
    similarArticles: [],
    source: "lorem ipsum",
    thumbnail: "loremipsum.com/image.jpg",
    title: "lorem ipsum",
    topic: "lorem ipsum" ,
    url: "loremipsum.com",
}


const articles: Article[] = [
    article1,
    article1,
    article1,
    article1,
    article1,
]

export default articles;
