import { Dialog, DialogTitle, DialogActions, Button, DialogProps, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import useFunction from 'src/hooks/use-function';
import { FileWithId } from 'src/types/file-data';

function DocumentsUploadDeleteDialog({
  onConfirm,
  data,
  ...dialogProps
}: DialogProps & {
  onConfirm?: () => Promise<void>;
  data: FileWithId;
}) {
  const onConfirmHelper = useFunction(onConfirm!, {
    successMessage: 'Hủy tài liệu thành công!'
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
          <Typography variant='h6'>Xóa tài liệu {data?.name}?</Typography>
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
          color='error'
          onClick={async (e) => {
            dialogProps.onClose?.(e, 'escapeKeyDown');
            await onConfirmHelper.call({});
          }}
        >
          Xoá
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DocumentsUploadDeleteDialog;