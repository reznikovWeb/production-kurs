import React from 'react';

import AboutIcon from 'shared/assets/icons/about.svg';
import ArtilcesIcon from 'shared/assets/icons/articles.svg';
import MainIcon from 'shared/assets/icons/main.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

export interface SidebarItemType {
   path: string;
   text: string;
   Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
   authOnly?: boolean;
}

export const SidebarItemList: SidebarItemType[] = [
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
   {
      path: RoutePath.profile,
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
];
