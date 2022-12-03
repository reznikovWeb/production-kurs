import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { CurrencySelect } from './CurrencySelect';

export default {
   title: 'entity/CurrencySelect',
   component: CurrencySelect,
} as ComponentMeta<typeof CurrencySelect>;

const Template: ComponentStory<typeof CurrencySelect> = (args) => <CurrencySelect {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
