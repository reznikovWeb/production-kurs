import React, { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { Button, SizeButton, ThemeButton } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { Drawer } from '@/shared/ui/Drawer/Drawer';
import { Input } from '@/shared/ui/Input/Input';
import { Modal } from '@/shared/ui/Modal/Modal';
import { HStack, VStack } from '@/shared/ui/Stack';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { Text } from '@/shared/ui/Text/Text';

interface RatingCardProps {
   className?: string;
   title?: string;
   feedbackTitle?: string;
   hasFeedback?: boolean;
   onCancel?: (starsCount: number) => void;
   onAccept?: (starsCount: number, feedback?: string) => void;
   rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
   const { className, feedbackTitle, title, hasFeedback, onCancel, onAccept, rate = 0 } = props;

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [starsCount, setStarsCount] = useState(rate);
   const [feedback, setFeedback] = useState('');

   const { t } = useTranslation();

   const onSelectStart = useCallback(
      (selectedStarsCount: number) => {
         setStarsCount(selectedStarsCount);
         if (hasFeedback) {
            setIsModalOpen(true);
         } else {
            onAccept?.(selectedStarsCount);
         }
      },
      [hasFeedback, onAccept],
   );

   const acceptHandle = useCallback(() => {
      setIsModalOpen(false);
      onAccept?.(starsCount, feedback);
   }, [feedback, onAccept, starsCount]);

   const cancelHandle = useCallback(() => {
      setIsModalOpen(false);
      onCancel?.(starsCount);
   }, [onCancel, starsCount]);

   const modalContent = (
      <>
         <Text title={feedbackTitle} />
         <Input value={feedback} onChange={setFeedback} placeholder={t('Ваш отзыв')} />
      </>
   );

   return (
      <Card className={className} max>
         <VStack align="center" gap="8">
            <Text title={starsCount ? t('Спасибо за оценку') : title} />
            <StarRating size={40} onSelect={onSelectStart} selectedStars={starsCount} />
         </VStack>
         <BrowserView>
            <Modal isOpen={isModalOpen}>
               <VStack max gap="32">
                  {modalContent}
                  <HStack max gap="16" justify="end">
                     <Button onClick={cancelHandle} theme={ThemeButton.OUTLINE_RED}>
                        {t('Закрыть')}
                     </Button>
                     <Button onClick={acceptHandle}>{t('Отправить')}</Button>
                  </HStack>
               </VStack>
            </Modal>
         </BrowserView>
         <MobileView>
            <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
               <VStack gap="32">
                  {modalContent}
                  <Button onClick={acceptHandle} size={SizeButton.L} fullWidth>
                     {t('Отправить')}
                  </Button>
               </VStack>
            </Drawer>
         </MobileView>
      </Card>
   );
});
