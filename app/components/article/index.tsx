import { useState } from 'react';

import { Image } from '@chakra-ui/react';

import Article from 'models/Article';

interface Props {
  article: Article;
}

const ArticleCard = (pageProps: Props) => {
  const article: Article = pageProps.article;
  const [isExpanded, setIsExpanded] = useState(false);

  const handelClickEvent = (
  ) => {
    setIsExpanded(!isExpanded);
  };

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

        <div className="expand-container" onClick={handelClickEvent}>
          <div className="expandable-area">
            <div className="expandable-area-left-content">
              <svg
                width="19"
                height="18"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
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

            <div className="expandable-area-right-content">
              {isExpanded ? (
                <svg
                  width="16"
                  height="10"
                  viewBox="0 0 16 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.0179 0.00891113L8 6.02678L1.98213 0.00891113L0 1.99104L8 9.99104L16 1.99104L14.0179 0.00891113Z"
                    fill="#484848"
                  />
                </svg>
              ) : (
                <svg
                  width="17"
                  height="10"
                  viewBox="0 0 17 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.83186 9.99106L8.84973 3.97319L14.8676 9.99106L16.8497 8.00893L8.84973 0.00893211L0.849732 8.00893L2.83186 9.99106Z"
                    fill="#484848"
                  />
                </svg>
              )}
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
