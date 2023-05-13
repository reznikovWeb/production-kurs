import React, { CSSProperties, useMemo } from 'react';

import { Mods, classNames } from '@/shared/lib/classNames/classNames';

import styles from './Avatar.module.scss';

interface AvatarProps {
   className?: string;
   src?: string;
   size?: number;
   alt?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ className, src, size, alt }) => {
   const mods: Mods = {};

   const style = useMemo<CSSProperties>(() => {
      return {
         width: size || 100,
         height: size || 100,
      };
   }, [size]);

   return <img style={style} src={src} className={classNames(styles.avatar, mods, [className])} alt={alt} />;
};
