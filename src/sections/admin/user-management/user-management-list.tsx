import React, { useMemo, useState } from 'react';
import { Box, Typography, Stack, TextField, InputAdornment, Button } from '@mui/material';
import { CustomTable } from 'src/components/custom-table';
import getUserManagementConfig from './user-management-table-config';
import usePagination from 'src/hooks/use-pagination';
import { useDialog } from 'src/hooks/use-dialog';
import AdvancedFilter from 'src/components/advanced-filter/advanced-filter';
import { UserDetail } from 'src/types/user';
import { Search as SearchIcon } from 'lucide-react';
import UserManagementDeleteDialog from './user-management-delete-dialog';

interface UserManagementListProps {
  employees: UserDetail[];
}

const UserManagementList: React.FC<UserManagementListProps> = ({ employees }) => {
  const deleteDialog = useDialog<UserDetail>();
  const [searchInput, setSearchInput] = useState('');

  const pagination = usePagination({
    count: employees.length
  });

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) =>
      employee.fullName.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [employees, searchInput]);

  const results = filteredEmployees.map((employee, index) => ({
    ...employee,
    index: index + 1
  }));

  const UserManagementListConfig = useMemo(() => {
    return getUserManagementConfig({
      onClickRemove: (data: UserDetail) => deleteDialog.handleOpen(data)
    });
  }, [getUserManagementConfig]);

  return (
    <Box>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography fontWeight={'bold'}>Số lượng nhân viên: {results.length}</Typography>
      </Stack>
      <Stack direction={'row'} alignItems={'center'} gap={3} className='mt-4'>
        <TextField
          variant='outlined'
          placeholder='Tìm kiếm theo tên...'
          className='w-[70%]'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        <AdvancedFilter filters={[]} />
      </Stack>
      <CustomTable
        className='mt-5'
        rows={results}
        configs={UserManagementListConfig}
        pagination={pagination}
      />
      <UserManagementDeleteDialog
        open={deleteDialog.open}
        onClose={deleteDialog.handleClose}
        employee={deleteDialog.data as UserDetail}
      />
    </Box>
  );
};

export default UserManagementList;
