import React, { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';

import { ArticleType } from 'entities/Article';

interface ArticleTypeTabsProps {
   className?: string;
   value: ArticleType;
   onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo(({ className, value, onChangeType }: ArticleTypeTabsProps) => {
   const { t } = useTranslation();

   const onTabClick = useCallback(
      (tab: TabItem) => {
         onChangeType(tab.value as ArticleType);
      },
      [onChangeType],
   );

   const typeTabs = useMemo<TabItem[]>(
      () => [
         { value: ArticleType.All, content: t('Все статьи') },
         { value: ArticleType.IT, content: t('Айти') },
         { value: ArticleType.ECONOMICS, content: t('Экономика') },
         { value: ArticleType.SCIENCE, content: t('Наука') },
      ],
      [t],
   );

   return (
      <Tabs
         tabs={typeTabs}
         value={value}
         onTabClick={onTabClick}
         className={classNames('', {}, [className])}
      />
   );
});
