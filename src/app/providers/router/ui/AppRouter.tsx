import React, { Suspense, memo, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppRouteProps } from '@/shared/types/router';

import { PageLoader } from '@/widgets/PageLoader';

import { routeConfig } from '@/app/providers/router/config/routeConfig';
import { RequireAuth } from '@/app/providers/router/ui/RequireAuth';

const AppRouter = () => {
   const renderWithWrapper = useCallback((route: AppRouteProps) => {
      const element = <Suspense fallback={<PageLoader />}>{route.element}</Suspense>;
      return (
         <Route
            key={route.path}
            path={route.path}
            element={
               route.authOnly ? <RequireAuth roles={route.roles}>{element}</RequireAuth> : element
            }
         />
      );
   }, []);

   return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
