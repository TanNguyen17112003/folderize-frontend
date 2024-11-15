import React, { useCallback, useMemo, useState } from 'react';
import { Box, Typography, Stack, TextField, InputAdornment, Button } from '@mui/material';
import { CustomTable } from 'src/components/custom-table';
import getUserManagementConfig from './user-management-table-config';
import usePagination from 'src/hooks/use-pagination';
import { useDialog } from 'src/hooks/use-dialog';
import { UserDetail } from 'src/types/user';
import { Search as SearchIcon } from 'lucide-react';
import UserManagementDeleteDialog from './user-management-delete-dialog';
import { OrganizationsApi } from 'src/api/organizations';
import DateRangePickerTextField from 'src/components/date-range-picker-textfield';
import { DateRangeProps, initialDateRange } from 'src/utils/fast-date-range-filter';

interface UserManagementListProps {
  employees: UserDetail[];
  setEmployees: React.Dispatch<React.SetStateAction<UserDetail[]>>;
}

const UserManagementList: React.FC<UserManagementListProps> = ({ employees, setEmployees }) => {
  const deleteDialog = useDialog<UserDetail>();
  const [dateRange, setDateRange] = useState<DateRangeProps>(initialDateRange);
  const [searchInput, setSearchInput] = useState('');
  const pagination = usePagination({
    count: employees.length
  });

  const filteredEmployees = useMemo(() => {
    return employees.filter(
      (employee) =>
        employee.fullName.toLowerCase().includes(searchInput.toLowerCase()) &&
        (!dateRange.startDate || new Date(employee.createdAt) >= dateRange.startDate) &&
        (!dateRange.endDate || new Date(employee.createdAt) <= dateRange.endDate)
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

  const handleDeleteEmployee = useCallback(
    async (employee: UserDetail) => {
      try {
        await OrganizationsApi.deleteOrganizationEmployee(employee.id);
        setEmployees(employees.filter((emp) => emp.id !== employee.id));
      } catch (error) {
        throw error;
      }
    },
    [setEmployees]
  );

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
        <Box className='w-[30%]'>
          <DateRangePickerTextField
            initialDateRange={{
              startDate: dateRange.startDate ?? undefined,
              endDate: dateRange.endDate ?? undefined
            }}
            onChange={(dateRange) =>
              setDateRange({
                startDate: dateRange.startDate ?? null,
                endDate: dateRange.endDate ?? null
              })
            }
            labelHolder='Nhập khoảng thời gian nhân viên tham gia tổ chức'
          />
        </Box>
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
        onConfirm={() => handleDeleteEmployee(deleteDialog.data as UserDetail)}
      />
    </Box>
  );
};

export default UserManagementList;
