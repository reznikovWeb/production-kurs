import React, { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Card, CardTheme } from 'shared/ui/Card/Card';
import { Icon } from 'shared/ui/Icon/Icon';
import { Text } from 'shared/ui/Text/Text';

import { ArticleView } from '../../model/const/articleConst';
import { ArticleBlockType } from '../../model/const/articleConst';
import { Article, ArticleTextBlock } from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import styles from './ArticleListItem.module.scss';

interface ArticleListItemProps {
   className?: string;
   article: Article;
   view: ArticleView;
   target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo(
   ({ className, article, view, target }: ArticleListItemProps) => {
      const { t } = useTranslation();
      const navigate = useNavigate();

      const types = <Text text={article.type.join(', ')} className={styles.types} />;
      const views = (
         <>
            <Text text={String(article.views)} className={styles.view} />
            <Icon Svg={EyeIcon} />
         </>
      );

      if (view === ArticleView.BIG) {
         const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT,
         ) as ArticleTextBlock;

         return (
            <div className={classNames(styles.ArticleListItem, {}, [className, styles[view]])}>
               <Card>
                  <div className={styles.header}>
                     <Avatar size={30} src={article.user.avatar} />
                     <Text text={article.user.username} className={styles.username} />
                     <Text text={article.createdAt} className={styles.date} />
                  </div>
                  <Text title={article.title} className={styles.title} />
                  {types}
                  <img src={article.img} alt={article.title} className={styles.img} />
                  {textBlock && (
                     <ArticleTextBlockComponent block={textBlock} className={styles.textBlock} />
                  )}
                  <div className={styles.footer}>
                     <AppLink target={target} to={RoutePath.article_details + article.id}>
                        <Button theme={ThemeButton.OUTLINE} className={styles.btn}>
                           {t('Читать далее')}
                        </Button>
                     </AppLink>
                     {views}
                  </div>
               </Card>
            </div>
         );
      }

      return (
         <AppLink
            target={target}
            to={RoutePath.article_details + article.id}
            className={classNames(styles.ArticleListItem, {}, [className, styles[view]])}
         >
            <Card className={styles.card} theme={CardTheme.OUTLINED}>
               <div className={styles.imageWrapper}>
                  <img src={article.img} className={styles.img} alt={article.title} />
                  <Text text={article.createdAt} className={styles.date} />
               </div>
               <div className={styles.infoWrapper}>
                  {types}
                  {views}
               </div>
               <Text text={article.title} className={styles.title} />
            </Card>
         </AppLink>
      );
   },
);
