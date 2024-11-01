import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import type { Page as PageType } from 'src/types/page';
import { Box, Stack, Tabs, Tab } from '@mui/material';
import ContentHeader from 'src/components/content-header';
import { useMemo, useState } from 'react';
import { userAccessData } from 'src/types/user-access';
import UserEditManagement from 'src/sections/admin/access-control/user-edit-management';
import UserAccessManagement from 'src/sections/admin/access-control/user-access-management';

const tabs = [
  {
    label: 'Chỉnh sửa tài liệu',
    key: 'edit'
  },
  {
    label: 'Truy cập tài liệu',
    key: 'access'
  }
];

const Page: PageType = () => {
  const [tab, setTab] = useState(tabs[0].key);

  const editUserAccessData = useMemo(() => {
    return userAccessData.filter((userAccess) => userAccess.accessType === 'EDIT');
  }, [userAccessData]);

  const accessUserAccessData = useMemo(() => {
    return userAccessData.filter((userAccess) => userAccess.accessType === 'ACCESS');
  }, [userAccessData]);

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
        title='Quản lý quyền truy cập'
        description='Quản lý và xác nhận quyền truy cập đến tài liệu trong nội bộ tổ chức'
        tabs={
          <Tabs value={tab} onChange={(_, value) => setTab(value)}>
            {tabs.map((tab) => (
              <Tab key={tab.key} label={tab.label} value={tab.key} />
            ))}
          </Tabs>
        }
      />
      <Box className='px-6 py-5'>
        {tab === tabs[0].key && <UserEditManagement userAccesses={editUserAccessData} />}
        {tab === tabs[1].key && <UserAccessManagement userAccesses={accessUserAccessData} />}
      </Box>
    </Stack>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
