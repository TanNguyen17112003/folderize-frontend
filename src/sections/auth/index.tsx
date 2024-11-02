import React from 'react';
import {
  Box,
  Stack,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import sigininBackground from 'public/ui/siginin_background.jpg';

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Địa chỉ email không hợp lệ').required('Required'),
      password: Yup.string().min(8, 'Mật khẩu phải có ít nhất 8 kí tự').required('Required')
    }),
    onSubmit: (values) => {
      // console.log(values);
    }
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <div
      className='flex items-center justify-center min-h-screen bg-cover bg-center'
      style={{
        backgroundImage: `url(${sigininBackground.src})`
      }}
    >
      <div className=' bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center'>
        <h1 className='text-2xl font-semibold text-gray-800 text-center mb-4'>Đăng nhập</h1>

        <form onSubmit={formik.handleSubmit} className='w-full'>
          <Stack spacing={4}>
            <TextField
              fullWidth
              id='email'
              name='email'
              label='Email'
              placeholder='mail@example.com'
              variant='outlined'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <MailOutlineIcon className='text-gray-500' />
                  </InputAdornment>
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                  boxShadow: 'none'
                }
              }}
            />

            <TextField
              fullWidth
              id='password'
              name='password'
              label='Mật khẩu'
              type={showPassword ? 'text' : 'password'}
              variant='outlined'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      edge='end'
                    >
                      {showPassword ? (
                        <VisibilityOff className='text-gray-500' />
                      ) : (
                        <Visibility className='text-gray-500' />
                      )}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                  boxShadow: 'none'
                }
              }}
            />

            <div className='flex justify-between items-center'>
              <FormControlLabel
                control={
                  <Checkbox
                    id='rememberMe'
                    name='rememberMe'
                    color='primary'
                    checked={formik.values.rememberMe}
                    onChange={formik.handleChange}
                  />
                }
                label='Nhớ mật khẩu'
                className='text-gray-700'
              />
              <Button color='primary' variant='text' size='small' className='text-blue-500'>
                Quên mật khẩu?
              </Button>
            </div>

            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className='mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2'
            >
              Đăng nhập
            </Button>

            <Button
              fullWidth
              variant='contained'
              color='inherit'
              className='mt-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2'
            >
              Đăng kí
            </Button>
          </Stack>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
