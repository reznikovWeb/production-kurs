import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildCssLoader } from './loaders/buildCssLoader';

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
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

   const babelLoader = {
      test: /\.(js|jsx|tsx)$/,
      exclude: /node_modules/,
      use: {
         loader: 'babel-loader',
      },
   };

   const typescriptLoader = {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
   };

   const cssLoader = buildCssLoader(isDev);

   return [fileLoader, svgLoader, babelLoader, typescriptLoader, cssLoader];
}
