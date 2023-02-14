import { useState } from 'react';

import { Box, Highlight } from '@chakra-ui/react';

import ShimmerImage from '@components/ShimmerImage';
import Article from 'models/Article';

interface Props {
  article: Article;
  query?: string;
}

const ArticleCard = (pageProps: Props) => {
  const { article, query = '' } = pageProps;
  const [isExpanded, setIsExpanded] = useState(false);

  const handelClickEvent = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="article-container">
      <div className="left-content">
        <ShimmerImage src={article.thumbnail} alt="ArticleCard" w="100%" h="100%" borderRadius="8px" />
      </div>

      <div className="right-content">
        <div>
          <Box as="h3" mb="2" noOfLines={2}>
            <Highlight styles={{ px: '0.5', py: '1', bg: 'yellow.100' }} query={query}>
              {article.title}
            </Highlight>
          </Box>
          <p
            style={{
              maxLines: 3,
            }}
          >
            <Highlight styles={{ px: '0.5', py: '1', bg: 'yellow.100' }} query={query}>
              {article.description}
            </Highlight>
          </p>
        </div>

        <div className="expand-container" onClick={handelClickEvent}>
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
              <h4>Xem tin ({article.timeReadMinutes ?? 1} phút đọc)</h4>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="expanded-content">
            <h2>Tin tức liên quan</h2>
            <div className="related-article">
              {article.relatedArticles?.map((relatedArticle) => {
                return (
                  <>
                    <h1>{relatedArticle.title}</h1>
                    <ArticleCard article={relatedArticle}></ArticleCard>
                  </>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;
