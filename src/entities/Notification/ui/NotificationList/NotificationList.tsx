import React, { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { VStack } from '@/shared/ui/Stack';

import { useNotifications } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import styles from './NotificationList.module.scss';

interface NotificationListProps {
   className?: string;
}

export const NotificationList = memo(({ className }: NotificationListProps) => {
   const { data, isLoading } = useNotifications(null, {
      pollingInterval: 10000,
   });

   if (isLoading) {
      return (
         <VStack gap="16" max className={classNames(styles.NotificationList, {}, [className])}>
            <Skeleton width="100%" border="8px" height="80px" />
            <Skeleton width="100%" border="8px" height="80px" />
            <Skeleton width="100%" border="8px" height="80px" />
         </VStack>
      );
   }

   return (
      <VStack max gap="16" className={classNames(styles.NotificationList, {}, [className])}>
         {data?.map((item) => (
            <NotificationItem key={item.id} item={item} />
         ))}
      </VStack>
   );
});
