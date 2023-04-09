import { EditableProfileCard } from 'features/EditableProfileCard';
import React from 'react';
import { useParams } from 'react-router-dom';

import { classNames } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack/VStack/VStack';

import { Page } from 'widgets/Page/Page';

interface ProfilePageProps {
   className?: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ className }) => {
   const { id } = useParams<{ id: string }>();

   return (
      <Page className={classNames('', {}, [className])}>
         <VStack max gap="16">
            <EditableProfileCard id={id} />
         </VStack>
      </Page>
   );
};

export default ProfilePage;
