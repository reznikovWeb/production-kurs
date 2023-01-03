import React, { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Text } from 'shared/ui/Text/Text';

import { IComment } from '../../model/types/comment';
import styles from './CommentCard.module.scss';

interface CommentCardProps {
   className?: string;
   comment: IComment;
   isLoading?: boolean;
}

export const CommentCard = memo(({ className, comment, isLoading }: CommentCardProps) => {
   if (isLoading) {
      return (
         <div className={classNames(styles.CommentCard, {}, [className])}>
            <div className={styles.header}>
               <Skeleton width={30} height={30} border="50%" />
               <Skeleton height={16} width="100%" className={styles.username} />
            </div>
            <Skeleton className={styles.text} height={50} width="100%" />
         </div>
      );
   }

   return (
      <div className={classNames(styles.CommentCard, {}, [className])}>
         <div className={styles.header}>
            {comment.user.avatar && <Avatar size={30} src={comment.user.avatar} />}
            <Text className={styles.username} title={comment.user.username} />
         </div>
         <Text className={styles.text} text={comment.text} />
      </div>
   );
});
