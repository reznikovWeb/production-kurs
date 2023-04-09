import React from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from 'widgets/Page/Page';

interface ForbiddenPageProps {
   className?: string;
}

export const ForbiddenPage: React.FC<ForbiddenPageProps> = () => {
   const { t } = useTranslation();
   return <Page>{t('У вас нет доступа к этой странице')}</Page>;
};
