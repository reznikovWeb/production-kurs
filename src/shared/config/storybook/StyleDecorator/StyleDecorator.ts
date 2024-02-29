// eslint-disable-next-line fsd-rules/layer-imports
import { Story } from '@storybook/react';

// eslint-disable-next-line fsd-rules/layer-imports
import '@/app/styles/index.scss';

export const StyleDecorator = (story: () => Story) => story();
