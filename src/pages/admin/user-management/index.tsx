import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import type { Page as PageType } from 'src/types/page';
import { Stack } from '@mui/material';
import ContentHeader from 'src/components/content-header';
import UserManagementList from 'src/sections/admin/user-management/user-management-list';
import { useEffect, useMemo, useState } from 'react';
import { OrganizationsApi } from 'src/api/organizations';
import useFunction from 'src/hooks/use-function';

const Page: PageType = () => {
  const getOrganizationEmployeesApi = useFunction(OrganizationsApi.getOrganizationEmployees);
  const employees = useMemo(() => {
    return (getOrganizationEmployeesApi.data?.employeeList || []).filter(
      (emp) => emp.role === 'EMPLOYEE'
    );
  }, [getOrganizationEmployeesApi.data]);

  useEffect(() => {
    getOrganizationEmployeesApi.call({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Stack
      sx={{
        maxHeight: '100vh',
        overflow: 'auto',
        bgcolor: 'white'
      }}
      className='min-h-screen'
    >
      <ContentHeader
        title='Quản lý nhân viên'
        description='Theo dõi và kiểm soát các hoạt động của nhân viên trong tổ chức'
      />
      <Stack className='px-6 py-5'>
        <UserManagementList employees={employees} />
      </Stack>
    </Stack>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
