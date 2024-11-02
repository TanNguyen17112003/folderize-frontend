// Dùng useFormik
import React from 'react';
import clsx from 'clsx';
import { Box, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';

interface CreateAccountProps {
  onGoogleSignIn?: () => void;
  onSubmitEmail?: (email: string) => void;
  isSubmitting?: boolean;
}

const CreateAccount: React.FC<CreateAccountProps> = ({
  onGoogleSignIn,
  onSubmitEmail,
  isSubmitting = false
}) => {
  const formik = useFormik({
    initialValues: { email: '' }, // Khởi tạo giá trị ban đầu cho biểu mẫu
    onSubmit: (values) => {
      // Hàm xử lý khi gửi biểu mẫu
      if (onSubmitEmail) {
        onSubmitEmail(values.email); // Gửi giá trị email đã nhập
      }
    }
  });

  return (
    <div className={clsx('min-h-screen flex items-center justify-center bg-[#C5D6FB]')}>
      <Box className='max-w-md w-full p-6 rounded-lg shadow-md bg-white text-center'>
        <h1 className='text-2xl font-semibold text-center mb-4'>Tạo tài khoản</h1>
        <p className='text-center mb-6'>
          Đã có tài khoản?{' '}
          <a href='/login' className='text-[#66DDB3]'>
            Đăng nhập
          </a>
        </p>

        {/* Step Indicator */}
        <div className='flex justify-center items-center gap-4 mb-6'>
          <div className='text-sm text-blue-600 font-bold'>1. Nhập địa chỉ email</div>
          <div className='text-sm text-blue-400'>2. Xác thực email</div>
          <div className='text-sm text-blue-400'>3. Hoàn tất đăng ký</div>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit}>
          <label className='block text-sm font-medium mb-1 text-left' htmlFor='email'>
            Email
          </label>

          <div className='mb-4'>
            <TextField
              fullWidth
              type='email'
              id='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6'
              placeholder='Nhập địa chỉ email của bạn'
              required
              variant='outlined'
            />
          </div>

          <Button
            type='submit'
            href='/signup2'
            disabled={isSubmitting}
            className={clsx(
              'w-full py-2 bg-[#6639F4] text-white font-semibold rounded-md',
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[3C76F1]'
            )}
          >
            Tạo tài khoản
            {/* Tạo tài khoản */}
          </Button>
        </form>

        <div className='my-4 flex items-center'>
          <span className='flex-grow border-t border-[#6639F4]'></span>
          <span className='mx-2 '>Hoặc</span>
          <span className='flex-grow border-t border-[#6639F4]'></span>
        </div>

        {/* Google Sign In */}
        <Button
          onClick={onGoogleSignIn}
          className='w-full py-2 border border-[#6639F4] rounded-md flex items-center justify-center text-[#6639F4] font-medium hover:bg-[#C5D6FB]'
        >
          <img
            src='https://cdn-icons-png.flaticon.com/128/281/281764.png'
            alt='Google'
            className='h-5 w-5 mr-2'
          />
          Đăng nhập với Google
        </Button>
      </Box>
    </div>
  );
};

export default CreateAccount;
