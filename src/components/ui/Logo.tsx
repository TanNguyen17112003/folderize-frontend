import type { FC } from 'react';
import logo from '../../../public/logo.png';

export const Logo: FC = () => {
  return <img src={logo.src} alt='logo' width='100%' height='100%' />;
};
