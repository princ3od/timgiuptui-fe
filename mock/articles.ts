import Article from '../models/Article';

const article1: Article = {
  id: '1',
  date: '2020-01-01',
  description: 'lorem ipsum dolor sit amet',
  source: 'lorem ipsum',
  thumbnail: 'loremipsum.com/image.jpg',
  title: 'Tuổi trẻ - du lịch - 8 giờ trước',
  topic: 'lorem ipsum',
  url: 'loremipsum.com',
  relatedArticles: [],
  timeReadMinutes: 0
};

const articles: Article[] = [article1, article1, article1, article1, article1];

export default articles;
