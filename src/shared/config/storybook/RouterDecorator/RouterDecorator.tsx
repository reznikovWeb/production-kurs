import { Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

// eslint-disable-next-line fsd-rules/layer-imports
import '@/app/styles/index.scss';

export const RouterDecorator = (StoryComponent: Story) => (
   <BrowserRouter>
      <StoryComponent />
   </BrowserRouter>
);
