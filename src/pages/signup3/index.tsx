// Dùng useFormik
import React, { useState } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import {
  Box,
  TextField,
  Typography,
  FormControlLabel,
  FormControl,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack
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

  const isFormComplete =
    formik.values.username.trim() !== '' &&
    formik.values.email.trim() !== '' &&
    formik.values.password.trim() !== '' &&
    formik.values.confirmPassword.trim() !== '' &&
    formik.values.identifier.trim() !== '' &&
    formik.values.acceptTerms;

  return (
    <Box
      className='min-h-screen flex items-center justify-center'
      sx={{ backgroundColor: '#C5D6FB' }}
    >
      <Box className='max-w-md w-full p-6 rounded-lg shadow-md bg-white text-center'>
        <Typography variant='h4' fontWeight='bold' mb={2}>
          Tạo tài khoản
        </Typography>
        <Typography mb={3}>
          Đã có tài khoản?{' '}
          <a href='/login' style={{ color: '#66DDB3' }}>
            Đăng nhập
          </a>
        </Typography>

        {/* Step Indicator */}
        <Stack direction='row' justifyContent='center' spacing={2} mb={3}>
          <Typography variant='body2' color='textSecondary'>
            1. Nhập địa chỉ email
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            2. Xác thực email
          </Typography>
          <Typography variant='body2' color='primary' fontWeight='bold'>
            3. Hoàn tất đăng ký
          </Typography>
        </Stack>

        <form onSubmit={formik.handleSubmit}>
          <FormControl fullWidth margin='normal'>
            <TextField
              fullWidth
              label='Username'
              id='username'
              name='username'
              value={formik.values.username}
              onChange={formik.handleChange}
              placeholder='Enter your username'
              variant='outlined'
              className='mb-4'
            />
          </FormControl>

          {/* Email */}
          <FormControl fullWidth margin='normal'>
            <TextField
              fullWidth
              label='Email'
              id='email'
              name='email'
              type='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder='Enter your email'
              variant='outlined'
              className='mb-4'
            />
          </FormControl>

          {/* Password */}
          <FormControl fullWidth margin='normal'>
            <TextField
              fullWidth
              label='Password'
              id='password'
              name='password'
              type='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder='Enter your password'
              variant='outlined'
              className='mb-4'
            />
          </FormControl>

          {/* Confirm Password */}
          <FormControl fullWidth margin='normal'>
            <TextField
              fullWidth
              label='Confirm Password'
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              placeholder='Confirm your password'
              variant='outlined'
              className='mb-4'
            />
          </FormControl>

          {/* Identifier */}
          <FormControl fullWidth margin='normal'>
            <TextField
              fullWidth
              label='Identifier'
              id='identifier'
              name='identifier'
              value={formik.values.identifier}
              onChange={formik.handleChange}
              placeholder='Enter your identifier'
              variant='outlined'
              className='mb-4'
            />
          </FormControl>

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
            disabled={!isFormComplete || isSubmitting}
            fullWidth
            variant='outlined'
            sx={{
              py: 2,
              borderColor: '#6639F4',
              color: '#6639F4',
              fontWeight: 'medium',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': { backgroundColor: '#C5D6FB' },
              opacity: !isFormComplete || isSubmitting ? 0.5 : 1,
              cursor: !isFormComplete || isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            Sign up
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Create;
