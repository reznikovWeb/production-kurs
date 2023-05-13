import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Page } from '@/widgets/Page/Page';

import styles from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
   className?: string;
}

const ArticleEditPage = memo(({ className }: ArticleEditPageProps) => {
   const { t } = useTranslation();
   const { id } = useParams<{ id: string }>();
   const isEdit = Boolean(id);

   return (
      <Page className={classNames(styles.ArticleEditPage, {}, [className])}>
         {isEdit ? t('Редактирование статьи с ID = ') + id : t('Создание новой статьи')}
      </Page>
   );
});

export default ArticleEditPage;
