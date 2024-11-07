import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogProps,
  Typography,
  TextField,
  Stack
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback } from 'react';
import useFunction from 'src/hooks/use-function';
import { OrganizationDetail } from 'src/types/organization';
import { useFormik } from 'formik';

function DashboardAminAddEmployeeDialog({
  organization,
  ...dialogProps
}: DialogProps & {
  organization: OrganizationDetail;
}) {
  const handleInvite = useCallback(async (values: { email: string; description: string }) => {
    console.log(values);
  }, []);

  const handleInviteHelper = useFunction(handleInvite, {
    successMessage: 'Gửi lời mời thành công'
  });

  const formik = useFormik<{ email: string; description: string }>({
    initialValues: {
      email: '',
      description: ''
    },
    onSubmit: async (values) => {
      await handleInviteHelper.call(values);
    }
  });

  return (
    <Dialog fullWidth maxWidth='xs' {...dialogProps}>
      <DialogTitle>
        <Typography fontSize={22}>Gửi lời mời tham gia tổ chức {organization?.name}</Typography>
        <Typography fontSize={12} fontWeight={'light'}>
          Nhập email của nhân viên bạn muốn mời tham gia tổ chức
        </Typography>
        <Stack marginTop={2} gap={2}>
          <TextField
            name='email'
            value={formik.values.email}
            placeholder='Thêm người để gửi lời mời tham gia tổ chức'
            onChange={formik.handleChange}
            fullWidth
          />
          <TextField
            name='description'
            value={formik.values.description}
            onChange={formik.handleChange}
            fullWidth
            multiline
            rows={4}
            placeholder='Lời nhắn'
          />
        </Stack>
      </DialogTitle>

      <DialogActions className='flex justify-center'>
        <Button
          variant='contained'
          color={'inherit'}
          onClick={(e) => {
            dialogProps.onClose?.(e, 'escapeKeyDown');
          }}
        >
          Hủy
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={async (e) => {
            dialogProps.onClose?.(e, 'escapeKeyDown');
            await formik.handleSubmit();
          }}
        >
          Gửi
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DashboardAminAddEmployeeDialog;
