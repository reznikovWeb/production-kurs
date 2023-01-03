import React, { memo } from 'react';
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
import { Text } from 'shared/ui/Text/Text';

import { ArticleDetails } from 'entities/Article';
import { CommentList } from 'entities/Comment';

import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import {
   articleDetailsCommentsSliceReducer,
   getArticleComments,
} from '../../model/slice/articleDetailsCommentsSlice';
import styles from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
   className?: string;
}

const reducers: ReducersList = {
   articleDetailsComments: articleDetailsCommentsSliceReducer,
};

const ArticleDetailsPage: React.FC<ArticleDetailsPageProps> = ({ className }) => {
   const { t } = useTranslation('article-details');
   const { id } = useParams<{ id: string }>();
   const dispatch = useAppDispatch();
   const comments = useSelector(getArticleComments.selectAll);
   const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

   useInitialEffect(() => {
      dispatch(fetchCommentsByArticleId(id));
   });

   if (!id) {
      return (
         <div className={classNames(styles.ArticleDetailsPage, {}, [className])}>
            {t('Статья не найдена')}
         </div>
      );
   }

   return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
         <div className={classNames(styles.ArticleDetailsPage, {}, [className])}>
            <ArticleDetails id={id} />
            <Text className={styles.commentTitle} title={t('Комментарии')} />
            <CommentList isLoading={commentsIsLoading} comments={comments} />
         </div>
      </DynamicModuleLoader>
   );
};

export default memo(ArticleDetailsPage);
