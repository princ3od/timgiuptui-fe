import { useMemo } from 'react';

import { Box, Highlight, Tooltip } from '@chakra-ui/react';

import ShimmerImage from '@components/ShimmerImage';
import { formatRelativeDateTime } from '@utils/index';
import Article from 'models/Article';
import Source from 'models/Source';
import Topic from 'models/Topic';

interface Props {
  article: Article;
  source?: Source;
  topic?: Topic;
  query?: string;
}

const ArticleCard = (pageProps: Props) => {
  const { article, query = '', source, topic } = pageProps;

  const date = useMemo(() => {
    const date = new Date(article.date);
    return formatRelativeDateTime(date);
  }, [article.date]);

  return (
    <div className="article-container">
      <div className="left-content">
        <ShimmerImage src={article.thumbnail} alt="ArticleCard" w="100%" h="100%" borderRadius="8px" />
      </div>

      <div className="right-content">
        <div>
          <Box as="h4" mb="2" justifyContent="space-between" display="flex" alignItems="center">
            {`${source?.name} - ${topic?.name}`}
            <Tooltip label={new Date(article.date).toLocaleString('vi')} aria-label="A tooltip" placement="top">
              <span>{date}</span>
            </Tooltip>
          </Box>
          <Box as="h3" mb="2" noOfLines={2}>
            <Highlight styles={{ px: '0.5', py: '1', bg: 'yellow.100' }} query={query}>
              {article.title.length > 100 ? `${article.title.substring(0, 100)}...` : article.title}
            </Highlight>
          </Box>
          <p
            style={{
              maxLines: 3,
            }}
          >
            <Highlight styles={{ px: '0.5', py: '1', bg: 'yellow.100' }} query={query}>
              {article.description.length > 200 ? `${article.description.substring(0, 200)}...` : article.description}
            </Highlight>
          </p>
        </div>

        <Box className="expand-container">
          <div className="expandable-area">
            <div className="expandable-area-left-content">
              <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.3035 0L13.6964 3.293L6.48399 10.293L7.9409 11.707L15.1533 4.707L18.5463 8V0H10.3035Z"
                  fill="#484848"
                />
                <path
                  d="M16.4856 16H2.0607V2H9.27314L7.21244 0H2.0607C0.924223 0 0 0.897 0 2V16C0 17.103 0.924223 18 2.0607 18H16.4856C17.6221 18 18.5463 17.103 18.5463 16V11L16.4856 9V16Z"
                  fill="#484848"
                />
              </svg>
              <a href={article.url} target="_blank" rel="noreferrer">
                <Box>Xem tin</Box>
              </a>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default ArticleCard;
