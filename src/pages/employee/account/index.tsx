import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import type { Page as PageType } from 'src/types/page';
import { Box, Stack, Tabs, Tab } from '@mui/material';
import ContentHeader from 'src/components/content-header';
import { useMemo, useState } from 'react';
import ProfileSection from 'src/sections/account/account-info';
import AccountPassword from 'src/sections/account/account-password';

const Page: PageType = () => {
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
        title='Thông tin cá nhân'
        description='Quản lý và chỉnh sửa thông tin cá nhân'
      />
      <Stack gap={1} marginX={3} marginY={2}>
        <ProfileSection />
        <AccountPassword />
      </Stack>
    </Stack>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
