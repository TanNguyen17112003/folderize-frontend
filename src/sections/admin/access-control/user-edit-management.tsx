import React, { useMemo } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { UserAccessDetail } from 'src/types/user-access';
import { CustomTable } from 'src/components/custom-table';
import getUserManagementConfig from './user-management-table-config';
import usePagination from 'src/hooks/use-pagination';
import { useDialog } from 'src/hooks/use-dialog';
import UserManagementApproveDialog from './user-management-approve-dialog';
import UserManagementDeleteDialog from './user-management-delete-dialog';
import AdvancedFilter from 'src/components/advanced-filter/advanced-filter';

interface UserEditManagementProps {
  userAccesses: UserAccessDetail[];
}

const UserEditManagement: React.FC<UserEditManagementProps> = ({ userAccesses }) => {
  const pagination = usePagination({
    count: userAccesses.length
  });

  const deleteDialog = useDialog<UserAccessDetail>();
  const approveDialog = useDialog<UserAccessDetail>();

  const userEditManagementConfig = useMemo(() => {
    return getUserManagementConfig({
      onClickApprove: (data: UserAccessDetail) => approveDialog.handleOpen(data),
      onClickDelete: (data: UserAccessDetail) => deleteDialog.handleOpen(data)
    });
  }, [getUserManagementConfig]);
  return (
    <Box>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography fontWeight={'bold'}>
          Số lượng yêu cầu chỉnh sửa tài liệu: {userAccesses.length}
        </Typography>
        <AdvancedFilter filters={[]} />
      </Stack>
      <CustomTable
        className='mt-5'
        rows={userAccesses}
        configs={userEditManagementConfig}
        pagination={pagination}
      />
      <UserManagementApproveDialog
        open={approveDialog.open}
        onClose={approveDialog.handleClose}
        userAccess={approveDialog.data as UserAccessDetail}
      />
      <UserManagementDeleteDialog
        open={deleteDialog.open}
        onClose={deleteDialog.handleClose}
        userAccess={deleteDialog.data as UserAccessDetail}
      />
    </Box>
  );
};

export default UserEditManagement;
