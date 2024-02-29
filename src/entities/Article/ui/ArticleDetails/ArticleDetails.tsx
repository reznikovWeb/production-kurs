import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
   DynamicModuleLoader,
   ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Avatar } from '@/shared/ui/Avatar';
import { Icon } from '@/shared/ui/Icon';
import { Skeleton } from '@/shared/ui/Skeleton';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text, TextAlign, TextSize } from '@/shared/ui/Text';

import { ArticleBlockType } from '../../model/const/articleConst';
import {
   getArticleDetailIsLoading,
   getArticleDetailsData,
   getArticleDetailsError,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { ArticleBlock } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import styles from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
   className?: string;
   id?: string;
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
            return <ArticleCodeBlockComponent block={block} key={block.id} />;
         case ArticleBlockType.IMAGE:
            return <ArticleImageBlockComponent block={block} key={block.id} />;
         case ArticleBlockType.TEXT:
            return <ArticleTextBlockComponent block={block} key={block.id} />;
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
         <VStack gap="4" max>
            <Skeleton className={styles.avatar} width={200} height={200} border="50%" />
            <Skeleton width={300} height={32} />
            <Skeleton width={600} height={24} />
            <Skeleton width="100%" height={200} />
            <Skeleton width="100%" height={200} />
         </VStack>
      );
   } else if (error) {
      content = <Text align={TextAlign.CENTER} title={t('Произошла ошибка при загрузке статьи')} />;
   } else {
      content = (
         <>
            <HStack justify="center" max>
               <Avatar size={200} src={article?.img} className={styles.avatar} />
            </HStack>
            <VStack gap="4" max>
               <Text title={article?.title} text={article?.subtitle} size={TextSize.L} />
               <HStack gap="8" max>
                  <Icon Svg={EyeIcon} />
                  <Text text={String(article?.views)} />
               </HStack>
               <HStack gap="8" max>
                  <Icon Svg={CalendarIcon} />
                  <Text text={article?.createdAt} />
               </HStack>
            </VStack>
            {article?.blocks.map(renderBlock)}
         </>
      );
   }

   return (
      <DynamicModuleLoader reducers={reducers}>
         <VStack gap="16" max className={classNames(styles.ArticleDetails, {}, [className])}>
            {content}
         </VStack>
      </DynamicModuleLoader>
   );
});
