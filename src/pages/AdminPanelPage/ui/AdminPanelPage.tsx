import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Page } from '@/widgets/Page';

interface AdminPanelPageProps {
   className?: string;
}

const AdminPanelPage = memo(({ className }: AdminPanelPageProps) => {
   const { t } = useTranslation();
   return <Page className={classNames('', {}, [className])}>{t('Админ панель')}</Page>;
});

export default AdminPanelPage;
