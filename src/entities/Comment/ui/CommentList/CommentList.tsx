import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';

import { IComment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
   className?: string;
   comments?: IComment[];
   isLoading?: boolean;
}

export const CommentList = memo(({ className, comments, isLoading }: CommentListProps) => {
   const { t } = useTranslation();

   if (isLoading) {
      return (
         <VStack gap="16" max className={classNames('', {}, [className])}>
            <CommentCard isLoading />
            <CommentCard isLoading />
            <CommentCard isLoading />
         </VStack>
      );
   }

   return (
      <VStack gap="16" max className={classNames('', {}, [className])}>
         {comments?.length ? (
            comments.map((comment) => (
               <CommentCard comment={comment} isLoading={isLoading} key={comment.id} />
            ))
         ) : (
            <Text text={t('Комментарии отсутствуют')} />
         )}
      </VStack>
   );
});
