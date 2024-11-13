import type { FC } from 'react';
import logo from '../../../public/logo.png';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export const Logo: FC = () => {
  return (
    <Box className='flex flex-col items-center gap-3'>
      <Image src={logo} alt='logo' width={100} height={100} />
      <Typography fontWeight={'bold'} fontSize={18}>
        Hệ thống đang khởi động vui lòng đợi...
      </Typography>
    </Box>
  );
};
