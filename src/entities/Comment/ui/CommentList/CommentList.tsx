import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';

import { IComment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';
import styles from './CommentList.module.scss';

interface CommentListProps {
   className?: string;
   comments?: IComment[];
   isLoading?: boolean;
}

export const CommentList = memo(({ className, comments, isLoading }: CommentListProps) => {
   const { t } = useTranslation();

   if (isLoading) {
      return (
         <div className={classNames(styles.CommentList, {}, [className])}>
            <CommentCard isLoading />
            <CommentCard isLoading />
            <CommentCard isLoading />
         </div>
      );
   }

   return (
      <div className={classNames(styles.CommentList, {}, [className])}>
         {comments?.length ? (
            comments.map((comment) => (
               <CommentCard
                  className={styles.comment}
                  comment={comment}
                  isLoading={isLoading}
                  key={comment.id}
               />
            ))
         ) : (
            <Text text={t('Комментарии отсутствуют')} />
         )}
      </div>
   );
});
