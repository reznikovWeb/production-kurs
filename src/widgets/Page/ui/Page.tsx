import React, { MutableRefObject, ReactNode, UIEvent, memo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import { TestProps } from '@/shared/types/test';

import { getUIScrollByPath, scrollSaveActions } from '@/features/ScrollSave';

import { StateSchema } from '@/app/providers/StoreProvider';

import styles from './Page.module.scss';

interface PageProps extends TestProps {
   className?: string;
   children: ReactNode;
   onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
   const { className, children, onScrollEnd } = props;
   const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
   const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

   const { pathname } = useLocation();
   const dispatch = useAppDispatch();

   const scrollPosition = useSelector((state: StateSchema) => getUIScrollByPath(state, pathname));

   const onHandleScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
      dispatch(
         scrollSaveActions.setScrollPosition({
            position: e.currentTarget.scrollTop,
            path: pathname,
         }),
      );
   }, 500);

   useInfiniteScroll({
      triggerRef,
      wrapperRef,
      callback: onScrollEnd,
   });

   useInitialEffect(() => {
      wrapperRef.current.scrollTop = scrollPosition;
   });

   return (
      <main
         onScroll={onHandleScroll}
         ref={wrapperRef}
         className={classNames(styles.Page, {}, [className])}
         data-testid={props['data-testid'] ?? 'Page'}
      >
         {children}
         {onScrollEnd ? <div className={styles.trigger} ref={triggerRef} /> : null}
      </main>
   );
});
