import React, { memo } from 'react';

import { RoutePath } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink';
import { Avatar } from '@/shared/ui/Avatar';
import { Skeleton } from '@/shared/ui/Skeleton';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import { IComment } from '../../model/types/comment';
import styles from './CommentCard.module.scss';

interface CommentCardProps {
   className?: string;
   comment?: IComment;
   isLoading?: boolean;
}

export const CommentCard = memo(({ className, comment, isLoading }: CommentCardProps) => {
   if (isLoading) {
      return (
         <div className={classNames(styles.CommentCard, {}, [className, styles.loading])}>
            <div className={styles.header}>
               <Skeleton width={30} height={30} border="50%" />
               <Skeleton height={16} width="100%" />
            </div>
            <Skeleton className={styles.text} height={50} width="100%" />
         </div>
      );
   }

   if (!comment) {
      return null;
   }

   return (
      <VStack gap="8" max className={classNames(styles.CommentCard, {}, [className])}>
         <AppLink to={`${RoutePath.profile}${comment.user.id}`} className={styles.header}>
            {comment.user.avatar && <Avatar size={30} src={comment.user.avatar} />}
            <Text title={comment.user.username} />
         </AppLink>
         <Text text={comment.text} />
      </VStack>
   );
});
