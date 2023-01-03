import React, { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import CalendarIcon from 'shared/assets/icons/calendar-20-20.svg';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import {
   DynamicModuleLoader,
   ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Icon } from 'shared/ui/Icon/Icon';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text';

import {
   getArticleDetailIsLoading,
   getArticleDetailsData,
   getArticleDetailsError,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { ArticleBlock, ArticleBlockType } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import styles from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
   className?: string;
   id: string;
}

const reducers: ReducersList = {
   articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
   const { t } = useTranslation();

   const isLoading = useSelector(getArticleDetailIsLoading);
   const article = useSelector(getArticleDetailsData);
   const error = useSelector(getArticleDetailsError);

   const dispatch = useAppDispatch();

   const renderBlock = useCallback((block: ArticleBlock) => {
      switch (block.type) {
         case ArticleBlockType.CODE:
            return <ArticleCodeBlockComponent className={styles.block} block={block} key={block.id} />;
         case ArticleBlockType.IMAGE:
            return <ArticleImageBlockComponent className={styles.block} block={block} key={block.id} />;
         case ArticleBlockType.TEXT:
            return <ArticleTextBlockComponent className={styles.block} block={block} key={block.id} />;
         default:
            return null;
      }
   }, []);

   useInitialEffect(() => {
      dispatch(fetchArticleById(id));
   });

   let content;

   if (isLoading) {
      content = (
         <div>
            <Skeleton className={styles.avatar} width={200} height={200} border="50%" />
            <Skeleton className={styles.title} width={300} height={32} />
            <Skeleton className={styles.skeleton} width={600} height={24} />
            <Skeleton className={styles.skeleton} width="100%" height={200} />
            <Skeleton className={styles.skeleton} width="100%" height={200} />
         </div>
      );
   } else if (error) {
      content = <Text align={TextAlign.CENTER} title={t('Произошла ошибка при загрузке статьи')} />;
   } else {
      content = (
         <>
            <div className={styles.avatarWrapper}>
               <Avatar size={200} src={article?.img} className={styles.avatar} />
            </div>
            <Text
               className={styles.title}
               title={article?.title}
               text={article?.subtitle}
               size={TextSize.L}
            />
            <div className={styles.articleInfo}>
               <Icon className={styles.icon} Svg={EyeIcon} />
               <Text text={String(article?.views)} />
            </div>
            <div className={styles.articleInfo}>
               <Icon className={styles.icon} Svg={CalendarIcon} />
               <Text text={article?.createdAt} />
            </div>
            {article?.blocks.map(renderBlock)}
         </>
      );
   }

   return (
      <div>
         <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(styles.ArticleDetails, {}, [className])}>{content}</div>
         </DynamicModuleLoader>
      </div>
   );
});
