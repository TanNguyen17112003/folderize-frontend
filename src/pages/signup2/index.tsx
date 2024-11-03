// Dùng useFormik
import React from 'react';
import clsx from 'clsx';
import { Box, TextField, Button, Stack, Typography, FormControl } from '@mui/material';
import { useFormik } from 'formik';

interface EmailVerificationProps {
  getEmail?: boolean;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ getEmail = false }) => {
  return (
    <Box
      className='min-h-screen flex items-center justify-center'
      sx={{ backgroundColor: '#C5D6FB' }}
    >
      <Box className='max-w-md w-full p-6 rounded-lg shadow-md bg-white text-center'>
        <Typography variant='h4' fontWeight='bold' mb={2}>
          Tạo tài khoản
        </Typography>
        <Typography mb={3}>Để bắt đầu xin hãy kiểm tra email của bạn</Typography>

        {/* Step Indicator */}
        <Stack direction='row' justifyContent='center' spacing={2} mb={3}>
          <Typography variant='body2' color='textSecondary'>
            1. Nhập địa chỉ email
          </Typography>
          <Typography variant='body2' color='primary' fontWeight='bold'>
            2. Xác thực email
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            3. Hoàn tất đăng ký
          </Typography>
        </Stack>

        {/* Email Verification Message */}
        <Stack spacing={1} alignItems='center' mb={3}>
          <Typography mb={3}>Kiểm tra email của bạn</Typography>
          <Typography variant='body2'>
            Chưa nhận được email?{' '}
            <Box component='a' href='#' sx={{ color: '#FFBB38', textDecoration: 'none' }}>
              Gửi lại
            </Box>
          </Typography>
        </Stack>

        {/* Continue Button */}
        <Button
          href='/signup3'
          variant='outlined'
          fullWidth
          sx={{
            py: 2,
            borderColor: '#6639F4',
            color: '#6639F4',
            fontWeight: 'medium',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': { backgroundColor: '#C5D6FB' }
          }}
        >
          Tiếp tục
        </Button>
      </Box>
    </Box>
  );
};

export default EmailVerification;
