// Dùng useFormik
// git push origin kimngan
import React from 'react';
import { Box, TextField, Button, Stack, Typography, FormControl } from '@mui/material';
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

  const isEmailFilled = formik.values.email.trim() !== '';

  return (
    // <Box className={clsx('min-h-screen flex items-center justify-center bg-[#C5D6FB]')}>
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
          <Typography variant='body2' color='primary' fontWeight='bold'>
            1. Nhập địa chỉ email
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            2. Xác thực email
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            3. Hoàn tất đăng ký
          </Typography>
        </Stack>

        {/* Form */}
        <form onSubmit={formik.handleSubmit}>
          <FormControl fullWidth margin='normal'>
            <TextField
              type='email'
              id='email'
              label='Email'
              value={formik.values.email}
              onChange={formik.handleChange}
              variant='outlined'
              required
              placeholder='Nhập địa chỉ email của bạn'
            />
          </FormControl>

          <Button
            type='submit'
            href='/signup2'
            onClick={onGoogleSignIn}
            variant='outlined'
            fullWidth
            disabled={!isEmailFilled || isSubmitting}
            sx={{
              py: 2,
              borderColor: '#6639F4',
              color: '#6639F4',
              fontWeight: 'medium',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': { backgroundColor: '#C5D6FB' },
              opacity: !isEmailFilled || isSubmitting ? 0.5 : 1,
              cursor: !isEmailFilled || isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            Tạo tài khoản
          </Button>
        </form>

        <Stack direction='row' alignItems='center' spacing={1} mt={3} mb={3}>
          <Box flex={1} borderTop={1} borderColor='#6639F4'></Box>
          <Typography>Hoặc</Typography>
          <Box flex={1} borderTop={1} borderColor='#6639F4'></Box>
        </Stack>

        {/* Google Sign In */}
        <Button
          onClick={onGoogleSignIn}
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
          Đăng nhập với Google
        </Button>
      </Box>
    </Box>
  );
};

export default CreateAccount;
