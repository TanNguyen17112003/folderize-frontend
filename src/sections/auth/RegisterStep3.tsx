import React, { useCallback, useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider
} from '@mui/material';
import FormInput from 'src/components/ui/FormInput';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import PasswordInput from './PasswordInput';
import * as Yup from 'yup';
import { SignUpRequest } from 'src/api/users';
import { useAuth } from 'src/hooks/use-auth';
import useFunction from 'src/hooks/use-function';
import { paths } from 'src/paths';

interface SignUpFormProps extends Omit<SignUpRequest, 'token'> {}

function RegisterStep3() {
  const router = useRouter();
  const { completeSignUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleCompleteSignUp = useCallback(async (values: SignUpRequest) => {
    try {
      const response = await completeSignUp(values);
    } catch (error: any) {
      console.error(error);
    }
  }, []);
  const handleCompleteSignUpHelper = useFunction(handleCompleteSignUp, {
    successMessage: 'Đăng ký thành công!'
  });
  const formik = useFormik<SignUpFormProps & { confirmPassword: string }>({
    initialValues: {
      phone: '',
      full_name: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Tên không được để trống'),
      full_name: Yup.string().required('Họ không được để trống'),
      phone: Yup.string().required('Số điện thoại không được để trống'),
      dormitory: Yup.string().required('Kí túc xá không được để trống'),
      room: Yup.string().required('Phòng không được để trống'),
      building: Yup.string().required('Tòa nhà không được để trống'),
      password: Yup.string().required('Mật khẩu không được để trống'),
      confirmPassword: Yup.string()
        .required('Nhập lại mật khẩu không được để trống')
        .oneOf([Yup.ref('password')], 'Mật khẩu không khớp')
    }),
    onSubmit: useCallback(
      async (values) => {
        try {
          const signUpData = {
            full_name: values.full_name,
            phone: values.phone,
            password: values.password,
            token: router.query.token as string
          };
          await handleCompleteSignUpHelper.call(signUpData);
          router.push(paths.auth.login);
        } catch (error: any) {
          console.error(error);
        }
      },
      [router.query.token]
    )
  });

  return (
    <form onSubmit={formik.handleSubmit} className='w-full flex flex-col items-center'>
      <Stack width={'50%'} spacing={2} justifyContent={'center'}>
        <Box display={'flex'} flexDirection={'column'} gap={0.4}>
          <Typography fontWeight={'bold'}>Họ và tên</Typography>
          <FormInput
            type='text'
            className='w-full px-3 rounded-lg bg-white'
            {...formik.getFieldProps('full_name')}
            error={formik.touched.full_name && !!formik.errors.full_name}
            helperText={formik.touched.full_name && formik.errors.full_name}
          />
        </Box>

        <Box display={'flex'} flexDirection={'column'} gap={0.4}>
          <Typography fontWeight={'bold'}>Số điện thoại</Typography>
          <FormInput
            type='text'
            className='w-full px-3 rounded-lg bg-white'
            {...formik.getFieldProps('phone')}
            error={formik.touched.phone && !!formik.errors.phone}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </Box>
        <Box display={'flex'} flexDirection={'column'} gap={0.5}>
          <Typography fontWeight={'bold'}>Mật khẩu</Typography>
          <PasswordInput
            {...formik.getFieldProps('password')}
            showPassword={showPassword}
            togglePasswordVisibility={() => setShowPassword(!showPassword)}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
            className='bg-white'
          />
        </Box>
        <Box display={'flex'} flexDirection={'column'} gap={0.5}>
          <Typography fontWeight={'bold'}>Nhập lại mật khẩu</Typography>
          <PasswordInput
            {...formik.getFieldProps('confirmPassword')}
            showPassword={showConfirmPassword}
            togglePasswordVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
            error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            className='bg-white'
          />
        </Box>
        <Button
          className='mt-2 bg-green-400 hover:shadow-sm hover:bg-green-500'
          type='submit'
          variant='contained'
        >
          Hoàn tất
        </Button>
      </Stack>
    </form>
  );
}

export default RegisterStep3;
