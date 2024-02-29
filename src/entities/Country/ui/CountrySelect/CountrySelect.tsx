import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ListBox } from '@/shared/ui/Popups';

import { Country } from '../../model/types/country';

interface CountrySelectProps {
   className?: string;
   value?: Country;
   onChange?: (value: Country) => void;
   readonly?: boolean;
}

const options = [
   { value: Country.Russia, content: Country.Russia },
   { value: Country.Belarus, content: Country.Belarus },
   { value: Country.Kazakhstan, content: Country.Kazakhstan },
];

export const CountrySelect = memo(
   ({ className, value, onChange, readonly }: CountrySelectProps) => {
      const { t } = useTranslation();

      const onChangeHandler = useCallback(
         (value: string) => {
            onChange?.(value as Country);
         },
         [onChange],
      );

      return (
         <ListBox
            onChange={onChangeHandler}
            value={value}
            items={options}
            className={className}
            readonly={readonly}
            defaultValue={t('Укажите страну')}
            label={t('Укажите страну')}
         />
      );
   },
);
