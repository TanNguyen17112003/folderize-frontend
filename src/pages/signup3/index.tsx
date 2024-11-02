// Dùng useFormik
import React, { useState } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';

const Create = () => {
  const [openTerms, setOpenTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'User',
      identifier: '',
      acceptTerms: false
    },
    onSubmit: (values) => {
      setIsSubmitting(true);
      console.log('Form submitted:', values);
      setIsSubmitting(false);
    }
  });

  const handleOpenTerms = () => {
    setOpenTerms(true);
  };

  const handleCloseTerms = () => {
    setOpenTerms(false);
  };

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
          <div className='text-sm text-blue-400'>1. Nhập địa chỉ email</div>
          <div className='text-sm text-blue-400'>2. Xác thực email</div>
          <div className='text-sm text-blue-600 font-bold'>3. Hoàn tất đăng ký</div>
        </div>

        <form onSubmit={formik.handleSubmit}>
          {/* Username */}
          <label className='block text-sm font-medium mb-1 text-left' htmlFor='username'>
            Username
          </label>
          <TextField
            fullWidth
            id='username'
            name='username'
            value={formik.values.username}
            onChange={formik.handleChange}
            placeholder='Enter your username'
            variant='outlined'
            className='mb-4'
          />

          {/* Email */}
          <label className='block text-sm font-medium mb-1 text-left' htmlFor='email'>
            Email
          </label>
          <TextField
            fullWidth
            id='email'
            name='email'
            type='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder='Enter your email'
            variant='outlined'
            className='mb-4'
          />

          {/* Password */}
          <label className='block text-sm font-medium mb-1 text-left' htmlFor='password'>
            Password
          </label>
          <TextField
            fullWidth
            id='password'
            name='password'
            type='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder='Enter your password'
            variant='outlined'
            className='mb-4'
          />

          {/* Confirm Password */}
          <label className='block text-sm font-medium mb-1 text-left' htmlFor='confirmPassword'>
            Confirm Password
          </label>
          <TextField
            fullWidth
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            placeholder='Confirm your password'
            variant='outlined'
            className='mb-4'
          />

          {/* Identifier */}
          <label className='block text-sm font-medium mb-1 text-left' htmlFor='identifier'>
            Identifier
          </label>
          <TextField
            fullWidth
            id='identifier'
            name='identifier'
            value={formik.values.identifier}
            onChange={formik.handleChange}
            placeholder='Enter your identifier'
            variant='outlined'
            className='mb-4'
          />

          {/* Accept Terms */}
          <FormControlLabel
            control={
              <Checkbox
                name='acceptTerms'
                checked={formik.values.acceptTerms}
                onChange={formik.handleChange}
                color='primary'
              />
            }
            label={
              <span onClick={handleOpenTerms} className='text-blue-600 cursor-pointer'>
                Accept all Terms and Conditions
              </span>
            }
            className='mb-4'
          />

          {/* Pop-up hiển thị Terms and Conditions */}
          <Dialog open={openTerms} onClose={handleCloseTerms}>
            <DialogTitle>Terms and Conditions</DialogTitle>
            <DialogContent>
              <p>Nội dung...</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseTerms} color='primary'>
                Close
              </Button>
            </DialogActions>
          </Dialog>

          {/* Submit Button */}
          <Button
            type='submit'
            disabled={isSubmitting}
            className={clsx(
              'w-full py-2 bg-[#6639F4] text-white font-semibold rounded-md',
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#3C76F1]'
            )}
          >
            Sign up
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default Create;
