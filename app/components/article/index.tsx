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
import Article from "models/Article";

interface Props {
  article: Article;
}

const ArticleCard = (pageProps: Props) => {
  const article: Article = pageProps.article;

  return (
    <div className="article-container">
      <div className="left-content">
        <Image
          src={article.thumbnail}
          alt="ArticleCard"
          width={128}
          fit="fill"
        />
      </div>

      <div className="right-content">
        <div className="article-scroll-area">
          <h3>{article.title} </h3>
          <p>{article.description}</p>
        </div>

        <div className="tags-container">
          <HStack spacing={4}>
            <Tag size="md" key={`${article.topic}`} variant="subtle">
              <TagLabel>{`${article.topic}`}</TagLabel>
            </Tag>
          </HStack>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
