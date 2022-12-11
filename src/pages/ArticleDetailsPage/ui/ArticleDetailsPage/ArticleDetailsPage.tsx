import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';

import styles from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
   className?: string;
}

const ArticleDetailsPage: React.FC<ArticleDetailsPageProps> = ({ className }) => {
   const { t } = useTranslation('article');
   return <div className={classNames(styles.ArticleDetailsPage, {}, [className])}>ARTICLE DETAILS PAGE</div>;
};

export default memo(ArticleDetailsPage);
