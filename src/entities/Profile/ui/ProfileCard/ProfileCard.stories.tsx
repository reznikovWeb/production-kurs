import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import avatar from '@/shared/assets/tests/avatar.webp';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

import { ProfileCard } from './ProfileCard';

export default {
   title: 'entities/ProfileCard',
   component: ProfileCard,
   argTypes: {
      backgroundColor: { control: 'color' },
   },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
   data: {
      username: 'admin',
      age: 22,
      country: Country.Kazakhstan,
      lastname: 'test',
      first: 'test',
      city: 'test',
      currency: Currency.EUR,
      avatar,
   },
};

export const withError = Template.bind({});
withError.args = {
   error: 'true',
};

export const Loading = Template.bind({});
Loading.args = {
   isLoading: true,
};
