import React, { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextAlign } from '@/shared/ui/Text/Text';

import { ArticleImageBlock } from '../../model/types/article';
import styles from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
   className?: string;
   block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(({ className, block }: ArticleImageBlockComponentProps) => {
   return (
      <div className={classNames(styles.ArticleImageBlockComponent, {}, [className])}>
         <img src={block.src} className={styles.img} alt={block.title} />
         {block.title && <Text text={block.title} align={TextAlign.CENTER} />}
      </div>
   );
});
