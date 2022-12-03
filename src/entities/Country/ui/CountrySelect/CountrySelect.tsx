import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Select } from 'shared/ui/Select/Select';

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

export const CountrySelect = memo(({ className, value, onChange, readonly }: CountrySelectProps) => {
   const { t } = useTranslation();

   const onChangeHandler = useCallback(
      (value: string) => {
         onChange?.(value as Country);
      },
      [onChange],
   );

   return (
      <Select
         className={className}
         label={t('Укажите страну')}
         options={options}
         value={value}
         onChange={onChangeHandler}
         readonly={readonly}
      />
   );
});
