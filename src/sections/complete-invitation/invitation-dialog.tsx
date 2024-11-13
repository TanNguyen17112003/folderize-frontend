import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Avatar,
  DialogProps,
  Typography,
  TextField,
  Stack,
  DialogContent,
  Divider
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback } from 'react';
import useFunction from 'src/hooks/use-function';
import { formatDate } from 'src/utils/format-time-currency';
import { useRouter } from 'next/router';
import { OrganizationsApi } from 'src/api/organizations';
import { paths } from 'src/paths';

function InvitationDialog({
  organizationName,
  message,
  onDeny,
  ...dialogProps
}: DialogProps & {
  organizationName: string;
  message: string;
  onDeny: () => void;
}) {
  const router = useRouter();
  const handleAccept = useCallback(async () => {
    await OrganizationsApi.completeInvitation({
      token: router.query.token as string,
      userReply: 'ACCEPTED'
    });
    router.push(paths.auth.login);
  }, [router]);

  const handleAcceptHelper = useFunction(handleAccept, {
    successMessage: 'Chấp nhận lời mời thành công'
  });

  return (
    <Dialog fullWidth maxWidth='sm' {...dialogProps}>
      <DialogTitle>
        <Typography fontSize={12} fontWeight={'light'}>
          Hôm nay, {formatDate(new Date())}
        </Typography>
        <Typography fontSize={18}>Lời mởi đang chờ xử lý</Typography>
      </DialogTitle>
      <DialogContent className='flex flex-col justify-center items-center gap-2'>
        <Avatar sx={{ width: 60, height: 60, bgcolor: 'blue', color: 'white' }}>C</Avatar>
        <Typography textAlign={'center'} fontSize={20} fontWeight={'semibold'}>
          Tổ chức {organizationName} đã gửi lời mời tham gia tổ chức cho bạn với vai trò nhân viên
          tổ chức
        </Typography>
        <Typography fontWeight={'light'} fontSize={14}>
          {message || 'Tham gia tổ chức chúng tôi và tạo ra nhiều loại tài liệu'}
        </Typography>
      </DialogContent>
      <Divider sx={{ borderColor: 'blue' }} />
      <DialogActions className='flex justify-between'>
        <Button
          variant='contained'
          color={'inherit'}
          onClick={(e) => {
            dialogProps.onClose?.(e, 'escapeKeyDown');
            onDeny();
          }}
        >
          Từ chối
        </Button>
        <Button
          variant='contained'
          color='success'
          onClick={async (e) => {
            await handleAcceptHelper.call({});
          }}
        >
          Chấp nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default InvitationDialog;
