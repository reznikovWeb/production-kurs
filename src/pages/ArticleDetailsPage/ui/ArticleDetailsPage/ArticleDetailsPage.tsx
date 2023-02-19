import { AddCommentForm } from 'features/AddCommentForm';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { classNames } from 'shared/lib/classNames/classNames';
import {
   DynamicModuleLoader,
   ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { VStack } from 'shared/ui/Stack';
import { Text, TextSize } from 'shared/ui/Text/Text';

import { Page } from 'widgets/Page/Page';

import { ArticleDetails, ArticleList } from 'entities/Article';
import { CommentList } from 'entities/Comment';

import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { getArticleRecommendationsIsLoading } from '../../model/selectors/recommendations';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { articleDetailsPageReducer } from '../../model/slice';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import { getArticleRecommendations } from '../../model/slice/articleDetailsPageRecommendationsSlice';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import styles from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
   className?: string;
}

const reducers: ReducersList = {
   articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage: React.FC<ArticleDetailsPageProps> = ({ className }) => {
   const { t } = useTranslation('article-details');
   const { id } = useParams<{ id: string }>();

   const dispatch = useAppDispatch();

   const comments = useSelector(getArticleComments.selectAll);
   const recommendations = useSelector(getArticleRecommendations.selectAll);
   const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);
   const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

   const onSendComment = useCallback(
      (value: string) => {
         dispatch(addCommentForArticle(value));
      },
      [dispatch],
   );

   useInitialEffect(() => {
      dispatch(fetchCommentsByArticleId(id));
      dispatch(fetchArticleRecommendations());
   });

   if (!id) {
      return (
         <Page className={classNames(styles.ArticleDetailsPage, {}, [className])}>
            {t('Статья не найдена')}
         </Page>
      );
   }

   return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
         <Page className={classNames(styles.ArticleDetailsPage, {}, [className])}>
            <VStack gap="16" max>
               <ArticleDetailsPageHeader />
               <ArticleDetails id={id} />
               <Text size={TextSize.L} className={styles.commentTitle} title={t('Рекомендуем')} />
               <ArticleList
                  articles={recommendations}
                  isLoading={recommendationsIsLoading}
                  className={styles.recommendations}
                  target="_blank"
               />
               <Text size={TextSize.L} className={styles.commentTitle} title={t('Комментарии')} />
               <AddCommentForm onSendComment={onSendComment} />
               <CommentList isLoading={commentsIsLoading} comments={comments} />
            </VStack>
         </Page>
      </DynamicModuleLoader>
   );
};

export default memo(ArticleDetailsPage);
