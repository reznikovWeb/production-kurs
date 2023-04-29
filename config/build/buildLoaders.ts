import webpack from 'webpack';

import { buildBabelLoader } from './loaders/buildBabelLoader';
import { buildCssLoader } from './loaders/buildCssLoader';
import { BuildOptions } from './types/config';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
   const { isDev } = options;
   const fileLoader = {
      test: /\.(png|jpe?g|gif|woff2|woff)$/i,
      use: [
         {
            loader: 'file-loader',
         },
      ],
   };

   const svgLoader = {
      test: /\.svg$/,
      use: ['@svgr/webpack'],
   };

   // Обрабатывает ts/js
   const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
   // Обрабатывает tsx/jsx
   const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });

   // const typescriptLoader = {
   //    test: /\.tsx?$/,
   //    use: 'ts-loader',
   //    exclude: /node_modules/,
   // };

   const cssLoader = buildCssLoader(isDev);

   return [fileLoader, svgLoader, codeBabelLoader, tsxCodeBabelLoader, cssLoader];
}
