import React, { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import styles from './ArticleList.module.scss';

interface ArticleListProps {
   className?: string;
   articles: Article[];
   isLoading?: boolean;
   view?: ArticleView;
}

export const ArticleList = memo((props: ArticleListProps) => {
   const { className, articles, isLoading, view = ArticleView.SMALL } = props;

   return (
      <div className={classNames(styles.ArticleList, {}, [className, styles[view]])}>
         {articles.length > 0
            ? articles.map((article) => (
                 <ArticleListItem article={article} view={view} key={article.id} className={styles.card} />
              ))
            : null}
         {isLoading && (
            <div className={classNames(styles.ArticleList, {}, [className, styles[view]])}>
               {new Array(view === ArticleView.SMALL ? 9 : 3).fill(0).map((item, index) => (
                  <ArticleListItemSkeleton className={styles.card} view={view} key={index} />
               ))}
               ;
            </div>
         )}
      </div>
   );
});
