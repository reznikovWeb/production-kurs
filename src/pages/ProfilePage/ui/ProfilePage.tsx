import React from 'react';
import { useParams } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';

import { EditableProfileCard } from '@/features/EditableProfileCard';

import { Page } from '@/widgets/Page';

interface ProfilePageProps {
   className?: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ className }) => {
   const { id } = useParams<{ id: string }>();

   return (
      <Page data-testid="ProfilePage" className={classNames('', {}, [className])}>
         <VStack max gap="16">
            <EditableProfileCard id={id} />
         </VStack>
      </Page>
   );
};

export default ProfilePage;
