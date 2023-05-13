import React, { Suspense, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AddCommentForm } from '@/features/AddCommentForm';

import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Loader } from '@/shared/ui/Loader/Loader';
import { VStack } from '@/shared/ui/Stack';
import { Text, TextSize } from '@/shared/ui/Text/Text';

import { CommentList } from '@/entities/Comment';

import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';

interface ArticleDetailsCommentsProps {
   className?: string;
   id?: string;
}

export const ArticleDetailsComments = memo(({ className, id }: ArticleDetailsCommentsProps) => {
   const comments = useSelector(getArticleComments.selectAll);
   const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

   const { t } = useTranslation();

   const dispatch = useAppDispatch();

   const onSendComment = useCallback(
      (value: string) => {
         dispatch(addCommentForArticle(value));
      },
      [dispatch],
   );

   useInitialEffect(() => {
      dispatch(fetchCommentsByArticleId(id));
   });

   return (
      <VStack gap="8" className={classNames('', {}, [className])}>
         <Text size={TextSize.L} title={t('Комментарии')} />
         <Suspense fallback={<Loader />}>
            <AddCommentForm onSendComment={onSendComment} />
         </Suspense>

         <CommentList isLoading={commentsIsLoading} comments={comments} />
      </VStack>
   );
});
