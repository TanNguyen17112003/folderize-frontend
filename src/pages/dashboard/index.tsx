import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import type { Page as PageType } from 'src/types/page';
import { Box, Stack } from '@mui/material';
import ContentHeader from 'src/components/content-header';
import DashboardIndex from 'src/sections/dashboard';
import { useAuth } from 'src/hooks/use-auth';

const Page: PageType = () => {
  const { user } = useAuth();
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
        title={
          !user
            ? 'Tổng quan hệ thống'
            : user?.role === 'ADMIN'
              ? 'Tổng quan hệ thống'
              : 'Hoạt động gần đây'
        }
      />
      <DashboardIndex />
    </Stack>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
