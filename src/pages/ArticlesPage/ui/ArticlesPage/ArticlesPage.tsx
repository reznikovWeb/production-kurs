import React, { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import styles from './ArticlesPage.module.scss';

interface ArticlesPageProps {
   className?: string;
}

const ArticlesPage: React.FC<ArticlesPageProps> = ({ className }) => {
   // eslint-disable-next-line i18next/no-literal-string
   return <div className={classNames(styles.ArticlesPage, {}, [className])}>ARTICLES PAGE</div>;
};

export default memo(ArticlesPage);
