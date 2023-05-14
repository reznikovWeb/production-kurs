import { ArticleRating } from '@/features/ArticleRating';
import { ArticleRecommendationList } from '@/features/ArticleRecommendationList';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';
import {
   DynamicModuleLoader,
   ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { VStack } from '@/shared/ui/Stack';

import { ArticleDetails } from '@/entities/Article';

import { Page } from '@/widgets/Page/Page';

import { articleDetailsPageReducer } from '../../model/slice';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import styles from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
   className?: string;
}

const reducers: ReducersList = {
   articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage: React.FC<ArticleDetailsPageProps> = ({ className }) => {
   const { t } = useTranslation('article-details');
   const { id } = useParams<{ id: string }>();

   if (!id) {
      return null;
   }

   return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
         <Page className={classNames(styles.ArticleDetailsPage, {}, [className])}>
            <VStack gap="16" max>
               <ArticleDetailsPageHeader />
               <ArticleDetails id={id} />
               <ArticleRating articleId={id} />
               <ArticleRecommendationList />
               <ArticleDetailsComments id={id} />
            </VStack>
         </Page>
      </DynamicModuleLoader>
   );
};

export default memo(ArticleDetailsPage);
