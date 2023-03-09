import { EditableProfileCard } from 'features/EditableProfileCard';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { classNames } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack/VStack/VStack';
import { Text } from 'shared/ui/Text/Text';

import { Page } from 'widgets/Page/Page';

interface ProfilePageProps {
   className?: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ className }) => {
   const { id } = useParams<{ id: string }>();

   const { t } = useTranslation('profile');

   if (!id) {
      return <Text text={t('Профиль не найден')} />;
   }

   return (
      <Page className={classNames('', {}, [className])}>
         <VStack max gap="16">
            <EditableProfileCard id={id} />
         </VStack>
      </Page>
   );
};

export default ProfilePage;
