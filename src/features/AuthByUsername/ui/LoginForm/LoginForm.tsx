import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text, TextTheme } from 'shared/ui/Text/Text';

import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions } from '../../model/slice/loginSlice';
import styles from './LoginForm.module.scss';

interface LoginFormProps {
   className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
   const { username, password, error, isLoading } = useSelector(getLoginState);

   const { t } = useTranslation();

   const dispatch = useDispatch();

   const onChangeUsername = useCallback(
      (value: string) => {
         dispatch(loginActions.setUserName(value));
      },
      [dispatch],
   );

   const onChangePassword = useCallback(
      (value: string) => {
         dispatch(loginActions.setPassword(value));
      },
      [dispatch],
   );

   const onLoginClick = useCallback(() => {
      dispatch(loginByUsername({ username, password }));
   }, [dispatch, username, password]);

   return (
      <div className={classNames(styles.loginForm, {}, [className])}>
         <Text title={t('Форма авторизации')} />
         {error && <Text text={t('Вы ввели неверный логин или пароль')} theme={TextTheme.ERROR} />}
         <Input
            className={styles.input}
            type="text"
            placeholder={t('Введите username')}
            onChange={onChangeUsername}
            value={username}
         />
         <Input
            className={styles.input}
            type="text"
            placeholder={t('Введите пароль')}
            onChange={onChangePassword}
            value={password}
         />
         <Button className={styles.loginBtn} theme={ThemeButton.OUTLINE} onClick={onLoginClick} disabled={isLoading}>
            {t('Войти')}
         </Button>
      </div>
   );
});
