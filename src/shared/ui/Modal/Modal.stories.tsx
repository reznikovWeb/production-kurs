import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Modal } from './Modal';
import { Theme } from '@/shared/const/theme';

export default {
   title: 'shared/Modal',
   component: Modal,
   argTypes: {
      backgroundColor: { control: 'color' },
   },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
   isOpen: true,
   children:
      ' Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n' +
      '            Consectetur eaque earum eius enim error facilis id iure, laboriosam\n' +
      '            modi nesciunt officiis omnis, quae quam quidem, rem sed tempore\n' +
      '            voluptate voluptatem!',
};

export const Dark = Template.bind({});
Dark.args = {
   isOpen: true,
   children:
      ' Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n' +
      '            Consectetur eaque earum eius enim error facilis id iure, laboriosam\n' +
      '            modi nesciunt officiis omnis, quae quam quidem, rem sed tempore\n' +
      '            voluptate voluptatem!',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
