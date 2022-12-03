import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Select } from './Select';

export default {
   title: 'shared/Select',
   component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
   label: 'Label',
   options: [
      { value: '123', content: 'text 1' },
      { value: '1234', content: 'text 2' },
   ],
};
