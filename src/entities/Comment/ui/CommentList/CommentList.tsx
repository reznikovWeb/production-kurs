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

   return (
      <div className={classNames(styles.CommentList, {}, [className])}>
         {comments?.length ? (
            comments.map((comment) => (
               <CommentCard className={styles.comment} comment={comment} isLoading={isLoading} />
            ))
         ) : (
            <Text text={t('Комментарии отсутствуют')} />
         )}
      </div>
   );
});
