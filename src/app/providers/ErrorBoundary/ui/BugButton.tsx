import React, { useEffect, useState } from 'react';
import { Button } from '@/shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';

// Компонент для тестирования
export const BugButton: React.FC = () => {
   const [error, setError] = useState(false);
   const { t } = useTranslation();

   useEffect(() => {
      if (error) {
         throw new Error();
      }
   }, [error]);
   return (
      <Button
         onClick={() => { setError(true); }}
      >
         {t('Выбросить ошибку')}
      </Button>
   );
};
