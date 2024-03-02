import { createSelector } from '@reduxjs/toolkit';

import AboutIcon from '@/shared/assets/icons/about.svg';
import ArtilcesIcon from '@/shared/assets/icons/articles.svg';
import MainIcon from '@/shared/assets/icons/main.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import {
   getRouteAbout,
   getRouteArticles,
   getRouteMain,
   getRouteProfile,
} from '@/shared/const/router';

import { getUserAuthData } from '@/entities/User';

import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
   const sidebarItemList: SidebarItemType[] = [
      {
         path: getRouteMain(),
         Icon: MainIcon,
         text: 'Главная',
      },
      {
         path: getRouteAbout(),
         Icon: AboutIcon,
         text: 'О сайте',
      },
   ];

   if (userData) {
      sidebarItemList.push(
         {
            path: getRouteProfile(userData.id),
            Icon: ProfileIcon,
            text: 'Профиль',
            authOnly: true,
         },
         {
            path: getRouteArticles(),
            Icon: ArtilcesIcon,
            text: 'Статьи',
            authOnly: true,
         },
      );
   }

   return sidebarItemList;
});
