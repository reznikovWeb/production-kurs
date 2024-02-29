import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ThemeButton } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Text, TextTheme } from '@/shared/ui/Text';

import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import styles from './LoginForm.module.scss';

export interface LoginFormProps {
   className?: string;
   onSuccess: () => void;
}

const initialReducers: ReducersList = {
   loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
   const username = useSelector(getLoginUsername);
   const password = useSelector(getLoginPassword);
   const error = useSelector(getLoginError);
   const isLoading = useSelector(getLoginIsLoading);

   const { t } = useTranslation();

   const dispatch = useAppDispatch();

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

   const onLoginClick = useCallback(async () => {
      const result = await dispatch(loginByUsername({ username, password }));
      if (result.meta.requestStatus === 'fulfilled') {
         onSuccess();
      }
   }, [onSuccess, dispatch, username, password]);

   return (
      <DynamicModuleLoader reducers={initialReducers}>
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
      </DynamicModuleLoader>
   );
});

export default LoginForm;
