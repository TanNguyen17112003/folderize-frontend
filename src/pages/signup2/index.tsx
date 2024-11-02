// Dùng useFormik
import React from 'react';
import clsx from 'clsx';
import { Box, Button } from '@mui/material';
import { useFormik } from 'formik';

interface EmailVerificationProps {
  getEmail?: boolean;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ getEmail = false }) => {
  return (
    <div className={clsx('min-h-screen flex items-center justify-center bg-[#C5D6FB]')}>
      <Box className='max-w-md w-full p-6 rounded-lg shadow-md bg-white text-center'>
        <h1 className='text-2xl font-semibold mb-2'>Tạo tài khoản</h1>
        <p className='text-sm text-gray-600 mb-8'>Để bắt đầu xin hãy kiểm tra email của bạn</p>

        {/* Step Indicator */}
        <div className='flex justify-center items-center gap-4 mb-6'>
          <div className='text-sm text-blue-400'>1. Nhập địa chỉ email</div>
          <div className='text-sm text-blue-600 font-bold'>2. Xác thực email</div>
          <div className='text-sm text-blue-400'>3. Hoàn tất đăng ký</div>
        </div>

        {/* Email Verification Message */}
        <div className='flex flex-col items-center mb-6'>
          <p className='text-lg mb-2'>Kiểm tra email của bạn</p>
          <span className='text-sm'>
            Chưa nhận được email?{' '}
            <a href='#' className='text-[#FFBB38]'>
              Gửi lại
            </a>
          </span>
        </div>

        {/* Continue Button */}
        <Button
          type='submit'
          href='/signup3'
          disabled={getEmail}
          className={clsx(
            'w-full py-2 bg-[#6639F4] text-white font-semibold rounded-md',
            getEmail ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[3C76F1]'
          )}
        >
          Tiếp tục
        </Button>
      </Box>
    </div>
  );
};

export default EmailVerification;
