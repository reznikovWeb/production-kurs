import React, { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/Text';

import { ArticleView } from '../../model/const/articleConst';
import { Article } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import styles from './ArticleList.module.scss';

interface ArticleListProps {
   className?: string;
   articles: Article[];
   isLoading?: boolean;
   view?: ArticleView;
   target?: HTMLAttributeAnchorTarget;
}

export const ArticleList = memo((props: ArticleListProps) => {
   const { className, articles, isLoading, view = ArticleView.SMALL, target } = props;

   const { t } = useTranslation();

   return (
      <div className={classNames(styles.ArticleList, {}, [className, styles[view]])}>
         {articles.length > 0
            ? articles.map((article) => (
                 <ArticleListItem
                    target={target}
                    article={article}
                    view={view}
                    key={article.id}
                    className={styles.card}
                 />
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
         {!isLoading && !articles.length && (
            <div className={classNames(styles.ArticleList, {}, [className, styles[view]])}>
               <Text title={t('Статьи не найдены')} size={TextSize.L} />
            </div>
         )}
      </div>
   );
});
