import React from 'react';
import { useTranslation } from 'react-i18next';

import { ListBox } from 'shared/ui/ListBox/ListBox';
import { HStack } from 'shared/ui/Stack';

import { Page } from 'widgets/Page/Page';

const MainPage = () => {
   const { t } = useTranslation('main');
   return (
      <Page>
         <div>{t('Главная страница')}</div>
         <HStack>
            <div>asdasd</div>
            <ListBox
               defaultValue="Выберите значение"
               onChange={(value: string) => {}}
               value={undefined}
               items={[
                  { value: '1', content: '123' },
                  { value: '2', content: '123', disabled: true },
                  { value: '3', content: '123' },
               ]}
            />
         </HStack>
      </Page>
   );
};

export default MainPage;
