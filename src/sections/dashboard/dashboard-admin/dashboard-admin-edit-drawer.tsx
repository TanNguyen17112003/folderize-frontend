import React, { useCallback, useEffect, useMemo } from 'react';
import {
  Box,
  Button,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Stack } from '@mui/system';
import { useFormik } from 'formik';
import useFunction from 'src/hooks/use-function';
import { OrganizationDetail } from 'src/types/organization';
import { OrganizationsApi } from 'src/api/organizations';

interface OrganizationFormProps {
  name: string;
  code: string;
  organizationPhone: string;
  departmentType: string;
  address: string;
}

function DashboardAdminEditDrawer({
  open,
  organization,
  onClose,
  setOrganization
}: {
  open: boolean;
  onClose: () => void;
  organization: OrganizationDetail;
  setOrganization: (organization: OrganizationDetail) => void;
}) {
  const getOrganizationInfoApi = useFunction(OrganizationsApi.getUserOrganizationInfo);
  const handleEditOrganization = useCallback(
    async (values: OrganizationFormProps) => {
      try {
        const updatedOrganization = await OrganizationsApi.updateOrganization(values);
        await getOrganizationInfoApi.setData(updatedOrganization);
        setOrganization(updatedOrganization);
        onClose();
      } catch (error) {
        throw error;
      }
    },
    [
      organization,
      getOrganizationInfoApi.setData,
      getOrganizationInfoApi.data,
      onClose,
      setOrganization
    ]
  );
  const handleEditOrganizationHelper = useFunction(handleEditOrganization, {
    successMessage: 'Cập nhật thông tin tài liệu thành công!'
  });

  const formik = useFormik<OrganizationFormProps>({
    initialValues: {
      name: organization?.name || '',
      code: organization?.code || '',
      organizationPhone: organization?.organizationPhone || '',
      departmentType: organization?.departmentType || '',
      address: organization?.address || ''
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await handleEditOrganizationHelper.call(values);
        onClose();
      } catch {
        showSnackbarError('Có lỗi xảy ra');
      }
    }
  });

  useEffect(() => {
    getOrganizationInfoApi.call({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Drawer
      anchor='right'
      open={open}
      PaperProps={{
        sx: {
          width: 600
        }
      }}
      onClose={onClose}
    >
      <form onSubmit={formik.handleSubmit}>
        <Paper elevation={5} sx={{ p: 3, borderRadius: 0 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}
          >
            <Box>
              <Box sx={{ cursor: 'pointer' }} onClick={onClose}>
                <Typography variant='body2' sx={{ mb: 1 }}>
                  <ArrowBack
                    fontSize='small'
                    sx={{
                      verticalAlign: 'middle'
                    }}
                  />{' '}
                  Quay lại
                </Typography>
              </Box>
              <Typography variant='h6'>
                Điều chỉnh thông tin tổ chức {organization?.name}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center'
              }}
            >
              <Button color='inherit' variant='contained' onClick={onClose}>
                Hủy bỏ
              </Button>
              <Button variant='contained' color='primary' type='submit'>
                Cập nhật
              </Button>
            </Box>
          </Box>
        </Paper>
        <Stack spacing={3} padding={3}>
          <TextField
            label='Tên'
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            fullWidth
          />
          <TextField
            label='Mã số'
            name='code'
            value={formik.values.code}
            onChange={formik.handleChange}
            fullWidth
          />
          <TextField
            label='Số điện thoại'
            name='organizationPhone'
            value={formik.values.organizationPhone}
            onChange={formik.handleChange}
            fullWidth
          />
          <TextField
            label='Phòng ban'
            name='departmentType'
            value={formik.values.departmentType}
            onChange={formik.handleChange}
            fullWidth
          />
          <TextField
            label='Địa chỉ'
            name='address'
            value={formik.values.address}
            onChange={formik.handleChange}
            fullWidth
          />
        </Stack>
      </form>
    </Drawer>
  );
}

export default DashboardAdminEditDrawer;

function showSnackbarError(arg0: string) {
  throw new Error('Function not implemented.');
}
