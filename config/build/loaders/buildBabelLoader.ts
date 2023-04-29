import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin';
import { BuildOptions } from '../types/config';

interface BuildBabelLoaderProps extends BuildOptions {
   isTsx?: boolean;
}

export function buildBabelLoader({ isDev, isTsx }: BuildBabelLoaderProps) {
   return {
      test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
      exclude: /node_modules/,
      use: {
         loader: 'babel-loader',
         options: {
            presets: ['@babel/preset-env'],
            plugins: [
               // для работы с ключами i18n
               [
                  'i18next-extract',
                  {
                     locales: ['ru', 'en'],
                     keyAsDefaultValue: true,
                  },
               ],
               // Для работы с ts
               [
                  '@babel/plugin-transform-typescript',
                  {
                     isTsx,
                  },
               ],
               '@babel/plugin-transform-runtime',
               isTsx && [babelRemovePropsPlugin, { props: ['data-testid'] }],
               isDev && require.resolve('react-refresh/babel'),
            ].filter(Boolean),
         },
      },
   };
}
