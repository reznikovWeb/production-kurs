import React, { memo } from 'react';

import ListIcon from '@/shared/assets/icons/list-24-24.svg';
import TiledIcon from '@/shared/assets/icons/tiled-24-24.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ThemeButton } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

import { ArticleView } from '@/entities/Article';

import styles from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
   className?: string;
   view?: ArticleView;
   onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
   { view: ArticleView.SMALL, icon: TiledIcon },
   { view: ArticleView.BIG, icon: ListIcon },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
   const { className, view, onViewClick } = props;

   const onClick = (newView: ArticleView) => () => {
      return onViewClick?.(newView);
   };

   return (
      <div className={classNames(styles.ArticleViewSelector, {}, [className])}>
         {viewTypes.map((viewType, index) => (
            <Button key={index} theme={ThemeButton.CLEAR} onClick={onClick(viewType.view)}>
               <Icon
                  Svg={viewType.icon}
                  className={classNames('', { [styles.notSelected]: viewType.view !== view })}
               />
            </Button>
         ))}
      </div>
   );
});
