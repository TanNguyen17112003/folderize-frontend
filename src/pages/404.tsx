import React from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Container, Typography } from '@mui/material';
import image404 from '../../public/ui/error-404.png';

const Page = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <Box className='flex items-center justify-center min-h-screen'>
      <Container className='max-w-sm py-16'>
        <Box
          component='img'
          alt='Not authorized'
          src={image404.src}
          className='w-full h-auto mb-3'
        />
        <Typography variant='h1' align='center' className='text-4xl mb-4'>
          404: Không tìm thấy trang
        </Typography>
        <Box className='flex justify-center mt-3'>
          <Button
            variant='contained'
            color='primary'
            onClick={handleBackToHome}
            className='font-bold py-1 px-3 bg-blue-500 hover:bg-blue-700 text-white rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800'
          >
            Quay về trang chủ
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Page;
