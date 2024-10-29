import React from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Container, Typography } from '@mui/material';
import image500 from '../../public/ui/error-500.png';

const Page = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <Box className='flex items-center justify-center min-h-screen'>
      <Container className='max-w-lg mx-auto py-16'>
        <Box
          component='img'
          alt='Not authorized'
          src={image500.src}
          className='w-full h-auto mb-6'
        />
        <Typography variant='h1' align='center' className='text-4xl'>
          500: Có lỗi xảy ra
        </Typography>
        <Box className='flex justify-center mt-6'>
          <Button
            variant='contained'
            color='primary'
            onClick={handleBackToHome}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800'
          >
            Quay về trang chủ
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Page;
