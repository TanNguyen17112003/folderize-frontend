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
import { SignUpRequest, AdminSignUpRequest } from 'src/api/users';
import { useAuth } from 'src/hooks/use-auth';
import useFunction from 'src/hooks/use-function';
import { paths } from 'src/paths';
import { UsersApi } from 'src/api/users';

interface SignUpFormProps extends Omit<SignUpRequest, 'token'> {}
interface AdminSignUpFormProps extends Omit<AdminSignUpRequest, 'token'> {}

function RegisterStep3() {
  const router = useRouter();
  const role = router.query.role;

  const { completeSignUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleCompleteSignUp = useCallback(
    async (values: SignUpRequest | AdminSignUpRequest) => {
      if (role === 'ADMIN') {
        await UsersApi.completeAdminSignUp(values as AdminSignUpRequest);
        router.push(paths.auth.login);
      } else {
        await completeSignUp(values as SignUpRequest);
      }
    },
    [role, completeSignUp]
  );

  const handleCompleteSignUpHelper = useFunction(handleCompleteSignUp, {
    successMessage: 'Đăng ký thành công!',
    onSuccess: () => {
      router.push(paths.auth.login);
    }
  });

  const formik = useFormik<
    SignUpFormProps & { confirmPassword: string } & Partial<AdminSignUpFormProps>
  >({
    initialValues: {
      phone: '',
      fullName: '',
      password: '',
      confirmPassword: '',
      organizationName: '',
      organizationCode: '',
      departmentType: '',
      organizationPhone: '',
      address: ''
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Họ không được để trống'),
      phone: Yup.string().required('Số điện thoại không được để trống'),
      password: Yup.string().required('Mật khẩu không được để trống'),
      confirmPassword: Yup.string()
        .required('Nhập lại mật khẩu không được để trống')
        .oneOf([Yup.ref('password')], 'Mật khẩu không khớp'),
      ...(role === 'ADMIN' && {
        organizationName: Yup.string().required('Tên tổ chức không được để trống'),
        organizationCode: Yup.string().required('Mã tổ chức không được để trống'),
        departmentType: Yup.string().required('Loại phòng ban không được để trống'),
        organizationPhone: Yup.string().required('Số điện thoại tổ chức không được để trống'),
        address: Yup.string().required('Địa chỉ không được để trống')
      })
    }),
    onSubmit: useCallback(
      async (values) => {
        try {
          const signUpData = {
            fullName: values.fullName,
            phone: values.phone,
            password: values.password,
            token: router.query.token as string,
            ...(role === 'ADMIN' && {
              organizationName: values.organizationName,
              organizationCode: values.organizationCode,
              departmentType: values.departmentType,
              organizationPhone: values.organizationPhone,
              address: values.address
            })
          };
          await handleCompleteSignUpHelper.call(signUpData);
          router.push(paths.auth.login);
        } catch (error: any) {
          console.error(error);
        }
      },
      [router.query.token, role, handleCompleteSignUpHelper]
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
            {...formik.getFieldProps('fullName')}
            error={formik.touched.fullName && !!formik.errors.fullName}
            helperText={formik.touched.fullName && formik.errors.fullName}
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

        {role === 'ADMIN' && (
          <>
            <Box display={'flex'} flexDirection={'column'} gap={0.4}>
              <Typography fontWeight={'bold'}>Tên tổ chức</Typography>
              <FormInput
                type='text'
                className='w-full px-3 rounded-lg bg-white'
                {...formik.getFieldProps('organizationName')}
                error={formik.touched.organizationName && !!formik.errors.organizationName}
                helperText={formik.touched.organizationName && formik.errors.organizationName}
              />
            </Box>

            <Box display={'flex'} flexDirection={'column'} gap={0.4}>
              <Typography fontWeight={'bold'}>Mã tổ chức</Typography>
              <FormInput
                type='text'
                className='w-full px-3 rounded-lg bg-white'
                {...formik.getFieldProps('organizationCode')}
                error={formik.touched.organizationCode && !!formik.errors.organizationCode}
                helperText={formik.touched.organizationCode && formik.errors.organizationCode}
              />
            </Box>

            <Box display={'flex'} flexDirection={'column'} gap={0.4}>
              <Typography fontWeight={'bold'}>Loại phòng ban</Typography>
              <FormInput
                type='text'
                className='w-full px-3 rounded-lg bg-white'
                {...formik.getFieldProps('departmentType')}
                error={formik.touched.departmentType && !!formik.errors.departmentType}
                helperText={formik.touched.departmentType && formik.errors.departmentType}
              />
            </Box>

            <Box display={'flex'} flexDirection={'column'} gap={0.4}>
              <Typography fontWeight={'bold'}>Số điện thoại tổ chức</Typography>
              <FormInput
                type='text'
                className='w-full px-3 rounded-lg bg-white'
                {...formik.getFieldProps('organizationPhone')}
                error={formik.touched.organizationPhone && !!formik.errors.organizationPhone}
                helperText={formik.touched.organizationPhone && formik.errors.organizationPhone}
              />
            </Box>

            <Box display={'flex'} flexDirection={'column'} gap={0.4}>
              <Typography fontWeight={'bold'}>Địa chỉ</Typography>
              <FormInput
                type='text'
                className='w-full px-3 rounded-lg bg-white'
                {...formik.getFieldProps('address')}
                error={formik.touched.address && !!formik.errors.address}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Box>
          </>
        )}

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
