import { DropDownDirection } from '../../../types/ui';
import styles from './popup.module.scss';

export const mapDirectionClass: Record<DropDownDirection, string> = {
   'bottom left': styles.optionBottomLeft,
   'bottom right': styles.optionBottomRight,
   'top right': styles.optionTopRight,
   'top left': styles.optionTopLeft,
};
