import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import withMock from 'storybook-addon-mock';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';

import { Article } from 'entities/Article';

import { ArticleRecommendationList } from './ArticleRecommendationList';

export default {
   title: 'features/ArticleRecommendationList',
   component: ArticleRecommendationList,
   argTypes: {
      backgroundColor: { control: 'color' },
   },
   decorators: [withMock],
} as ComponentMeta<typeof ArticleRecommendationList>;

const Template: ComponentStory<typeof ArticleRecommendationList> = (args) => (
   <ArticleRecommendationList {...args} />
);

const article: Article = {
   id: '1',
   img: '',
   createdAt: '',
   views: 123,
   user: { id: '1', username: '123' },
   blocks: [],
   type: [],
   title: '123',
   subtitle: 'asdasd',
};

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
Normal.parameters = {
   mockData: [
      {
         url: __API__ + '/articles?_limit=3',
         method: 'GET',
         status: 200,
         response: [{ ...article }, { ...article, id: '2' }, { ...article, id: '3' }],
      },
   ],
};
