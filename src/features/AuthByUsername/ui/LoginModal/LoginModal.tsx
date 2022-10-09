import React from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';

import { LoginForm } from '../LoginForm/LoginForm';
import styles from './LoginModal.module.scss';

interface LoginModalProps {
   className?: string;
   isOpen: boolean;
   onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
   className,
   isOpen,
   onClose,
}) => {
   return (
      <Modal
         className={classNames(styles.LoginModal, {}, [className])}
         isOpen={isOpen}
         onClose={onClose}
         lazy
      >
         <LoginForm />
      </Modal>
   );
};