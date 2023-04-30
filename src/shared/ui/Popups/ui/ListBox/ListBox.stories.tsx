import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { ListBox } from './ListBox';

export default {
   title: 'shared/ListBox',
   component: ListBox,
   argTypes: {
      backgroundColor: { control: 'color' },
   },
   decorators: [
      (Story) => (
         <div style={{ padding: 100 }}>
            <Story />
         </div>
      ),
   ],
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

export const Normal = Template.bind({});
Normal.args = {
   defaultValue: 'text',
   items: [
      { content: '12asdasd3', value: '2123' },
      { content: '12asdaasdasdsd3', value: '21asd23' },
   ],
};

export const topLeft = Template.bind({});
topLeft.args = {
   direction: 'top left',
   defaultValue: 'text',
   items: [
      { content: '12asdasd3', value: '2123' },
      { content: '12asdaasdasdsd3', value: '21asd23' },
   ],
};

export const topRight = Template.bind({});
topRight.args = {
   direction: 'top right',
   defaultValue: 'text',
   items: [
      { content: '12asdasd3', value: '2123' },
      { content: '12asdaasdasdsd3', value: '21asd23' },
   ],
};

export const bottomLeft = Template.bind({});
bottomLeft.args = {
   direction: 'bottom left',
   defaultValue: 'text',
   items: [
      { content: '12asdasd3', value: '2123' },
      { content: '12asdaasdasdsd3', value: '21asd23' },
   ],
};
