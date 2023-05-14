import React from 'react';
import { useTranslation } from 'react-i18next';

import { RatingCard } from '@/entities/Rating';

import { Page } from '@/widgets/Page/Page';

const MainPage = () => {
   const { t } = useTranslation('main');
   return (
      <Page>
         <div>{t('Главная страница')}</div>
         <RatingCard title="Как вам статья" feedbackTitle="Оставьте отзыв" hasFeedback={true} />
      </Page>
   );
};

export default MainPage;
