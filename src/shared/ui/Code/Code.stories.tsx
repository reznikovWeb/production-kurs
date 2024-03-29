import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Code } from './Code';

export default {
   title: 'shared/Code',
   component: Code,
   argTypes: {
      backgroundColor: { control: 'color' },
   },
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

export const Normal = Template.bind({});
Normal.args = {
   text: `export default {
   title: 'pages/Code',
   component: Code,
   argTypes: {
      backgroundColor: { control: 'color' },
   },
} as ComponentMeta<typeof Code>;`,
};
