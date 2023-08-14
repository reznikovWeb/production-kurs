import { createSelector } from '@reduxjs/toolkit';

import AboutIcon from '@/shared/assets/icons/about.svg';
import ArtilcesIcon from '@/shared/assets/icons/articles.svg';
import MainIcon from '@/shared/assets/icons/main.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import { RoutePath } from '@/shared/const/router';

import { getUserAuthData } from '@/entities/User';

import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
   const sidebarItemList: SidebarItemType[] = [
      {
         path: RoutePath.main,
         Icon: MainIcon,
         text: 'Главная',
      },
      {
         path: RoutePath.about,
         Icon: AboutIcon,
         text: 'О сайте',
      },
   ];

   if (userData) {
      sidebarItemList.push(
         {
            path: RoutePath.profile + userData.id,
            Icon: ProfileIcon,
            text: 'Профиль',
            authOnly: true,
         },
         {
            path: RoutePath.articles,
            Icon: ArtilcesIcon,
            text: 'Статьи',
            authOnly: true,
         },
      );
   }

   return sidebarItemList;
});
