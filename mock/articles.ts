import Article from "model/article";

const article1:Article = {
    id: "1",
    accessedDate: "2020-01-01",
    author: "John Doe",
    content: "Trung Quốc trao huân chương đối ngoại cao quý nhất cho Tổng bí thư Nguyễn Phú Trọng TTO - Huân chương Hữu nghị, huân chương cao quý nhất của Trung Quốc dành cho người nước ngoài, đã được Tổng bí thư, Chủ tịch nước Trung Quốc Tập Cận Bình trao cho Tổng bí th",
    date: "2020-01-01",
    description: "lorem ipsum dolor sit amet",
    domain: "loremipsum.com",
    readTimeMinutes: 5,
    similarArticles: [],
    source: "lorem ipsum",
    thumbnail: "loremipsum.com/image.jpg",
    title: "Tuổi trẻ - du lịch - 8 giờ trước",
    topic: ["Trung quốc","Nguyễn Phú Trọng"] ,
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
