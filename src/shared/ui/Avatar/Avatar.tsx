import React, { CSSProperties, useMemo } from 'react';

import { Mods, classNames } from '@/shared/lib/classNames/classNames';

import UserIcon from '../../assets/icons/user-filled.svg';
import { AppImage } from '../AppImage/AppImage';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';
import styles from './Avatar.module.scss';

interface AvatarProps {
   className?: string;
   src?: string;
   size?: number;
   alt?: string;
   fallbackInverted?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
   className,
   src,
   size = 100,
   alt,
   fallbackInverted,
}) => {
   const mods: Mods = {};

   const style = useMemo<CSSProperties>(() => {
      return {
         width: size,
         height: size,
      };
   }, [size]);

   return (
      <AppImage
         errorFallback={
            <Icon Svg={UserIcon} width={size} height={size} inverted={fallbackInverted} />
         }
         fallback={<Skeleton width={size} height={size} border="50%" />}
         style={style}
         src={src}
         className={classNames(styles.avatar, mods, [className])}
         alt={alt}
      />
   );
};
