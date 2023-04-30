import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Button } from '../../../Button/Button';
import { DropDown } from './DropDown';

export default {
   title: 'shared/DropDown',
   component: DropDown,
   argTypes: {
      backgroundColor: { control: 'color' },
   },
} as ComponentMeta<typeof DropDown>;

const Template: ComponentStory<typeof DropDown> = (args) => <DropDown {...args} />;

export const Normal = Template.bind({});
Normal.args = {
   trigger: <Button>Open!</Button>,
   items: [{ content: 'first' }, { content: 'second' }, { content: 'third' }],
};
