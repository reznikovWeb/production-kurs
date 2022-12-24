import React, { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';

import { ArticleTextBlock } from '../../model/types/article';
import styles from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
   className?: string;
   block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(({ className, block }: ArticleTextBlockComponentProps) => {
   return (
      <div className={classNames(styles.ArticleTextBlockComponent, {}, [className])}>
         {block.title && <Text title={block.title} className={styles.title} />}
         {block.paragraphs.map((paragraph) => (
            <Text key={paragraph} text={paragraph} className={styles.paragraph} />
         ))}
      </div>
   );
});
