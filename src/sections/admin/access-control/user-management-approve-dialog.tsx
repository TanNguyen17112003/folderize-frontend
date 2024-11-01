import { Dialog, DialogTitle, DialogActions, Button, DialogProps, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import useFunction from 'src/hooks/use-function';
import { UserAccessDetail } from 'src/types/user-access';

function UserManagementApproveDialog({
  userAccess,
  onConfirm,
  ...dialogProps
}: DialogProps & {
  userAccess: UserAccessDetail;
  onConfirm?: () => Promise<void>;
}) {
  const onConfirmHelper = useFunction(onConfirm!, {
    successMessage: 'Chấp nhận quyền truy cập thành công!'
  });

  return (
    <Dialog fullWidth maxWidth='xs' {...dialogProps}>
      <DialogTitle>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant='h6'>
            {'Chấp nhận quyền truy cập' + userAccess?.accessType === 'EDIT'
              ? 'chỉnh sửa'
              : 'truy cập' + 'tài liệu ' + userAccess?.documentName + ' ?'}
          </Typography>
        </Box>
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
          color='success'
          onClick={async (e) => {
            dialogProps.onClose?.(e, 'escapeKeyDown');
            await onConfirmHelper.call({});
          }}
        >
          Chấp nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserManagementApproveDialog;
