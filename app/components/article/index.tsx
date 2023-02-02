import {
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Image,
  Text,
  Tag,
  TagLabel,
  HStack,
} from "@chakra-ui/react";
import article from "model/article";
import Article from "model/article";

interface Props {
  article: Article;
}

const ArticleCard = (pageProps: Props) => {
  const article: Article = pageProps.article;

  return (
    <div className="article-container">
      <div className="left-content">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4V01Y1amBAvidgs0Ul28s_f52e5VMhR92gTS-zn3yzxe2ybw8D5-CQnH9YHKmD1N4new&usqp=CAU"
          alt="ArticleCard  image"
        />
      </div>

      <div className="right-content">
        <div className="article-scroll-area">
          <h3>{article.title} </h3>
          <p>{article.content}</p>
        </div>

        <div className="tags-container">
          <HStack spacing={4}>
            {article.topic.map((topic) => (
              <Tag size="md" key={`${topic}`} variant="subtle">
                <TagLabel>{`${topic}`}</TagLabel>
              </Tag>
            ))}
          </HStack>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
