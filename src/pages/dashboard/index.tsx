import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import type { Page as PageType } from 'src/types/page';
import { Box, Stack } from '@mui/material';
import ContentHeader from 'src/components/content-header';
import DashboardIndex from 'src/sections/dashboard';

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
        title='Tổng quan hệ thống'
        description='Hệ thống quản lý tài liệu chính phủ FOLDERIZE'
      />
      <DashboardIndex />
    </Stack>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
