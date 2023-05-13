import React, { ReactNode } from 'react';

import { Mods, classNames } from '@/shared/lib/classNames/classNames';

import styles from './Flex.module.scss';

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexGap = '4' | '8' | '12' | '16' | '32';

const justifyClasses: Record<FlexJustify, string> = {
   start: styles.justifyStart,
   center: styles.justifyCenter,
   end: styles.justifyEnd,
   between: styles.justifyBetween,
};
const alignClasses: Record<FlexAlign, string> = {
   start: styles.alignStart,
   center: styles.alignCenter,
   end: styles.alignEnd,
};
const directionClasses: Record<FlexDirection, string> = {
   row: styles.directionRow,
   column: styles.directionColumn,
};
const gapClasses: Record<FlexGap, string> = {
   4: styles.gap4,
   8: styles.gap8,
   12: styles.gap12,
   16: styles.gap16,
   32: styles.gap32,
};

export interface FlexProps {
   className?: string;
   children: ReactNode;
   justify?: FlexJustify;
   align?: FlexAlign;
   direction: FlexDirection;
   gap?: FlexGap;
   max?: boolean;
}

export const Flex = (props: FlexProps) => {
   const {
      className,
      align = 'center',
      justify = 'start',
      direction = 'row',
      children,
      gap,
      max,
   } = props;

   const classes = [
      className,
      justifyClasses[justify],
      alignClasses[align],
      directionClasses[direction],
      gap && gapClasses[gap],
   ];

   const mods: Mods = {
      [styles.max]: max,
   };

   return <div className={classNames(styles.Flex, mods, classes)}>{children}</div>;
};
