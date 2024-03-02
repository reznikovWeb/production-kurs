import {
   AppRoutes,
   getRouteAbout,
   getRouteAdminPanel,
   getRouteArticles,
   getRouteArticlesCreate,
   getRouteArticlesDetails,
   getRouteArticlesEdit,
   getRouteForbidden,
   getRouteMain,
   getRouteProfile,
} from '@/shared/const/router';
import { AppRouteProps } from '@/shared/types/router';

import { UserRole } from '@/entities/User';

import { AboutPage } from '@/pages/AboutPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
   [AppRoutes.MAIN]: {
      path: getRouteMain(),
      element: <MainPage />,
   },
   [AppRoutes.ABOUT]: {
      path: getRouteAbout(),
      element: <AboutPage />,
   },
   [AppRoutes.PROFILE]: {
      path: getRouteProfile(':id'),
      element: <ProfilePage />,
      authOnly: true,
   },
   [AppRoutes.ARTICLES]: {
      path: getRouteArticles(),
      element: <ArticlesPage />,
      authOnly: true,
   },
   [AppRoutes.ARTICLE_DETAILS]: {
      path: getRouteArticlesDetails(':id'),
      element: <ArticleDetailsPage />,
      authOnly: true,
   },
   [AppRoutes.ARTICLE_CREATE]: {
      path: getRouteArticlesCreate(),
      element: <ArticleEditPage />,
      authOnly: true,
   },
   [AppRoutes.ARTICLE_EDIT]: {
      path: getRouteArticlesEdit(':id'),
      element: <ArticleEditPage />,
      authOnly: true,
   },
   [AppRoutes.ADMIN_PANEL]: {
      path: getRouteAdminPanel(),
      element: <AdminPanelPage />,
      authOnly: true,
      roles: [UserRole.MANAGER, UserRole.ADMIN],
   },
   [AppRoutes.FORBIDDEN]: {
      path: getRouteForbidden(),
      element: <ForbiddenPage />,
   },
   [AppRoutes.NOT_FOUND]: {
      path: '*',
      element: <NotFoundPage />,
   },
};
