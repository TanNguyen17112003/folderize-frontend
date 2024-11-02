import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import type { Page as PageType } from 'src/types/page';
import { Box, Stack } from '@mui/material';
import ContentHeader from 'src/components/content-header';
import DocumentIndex from 'src/sections/documents/index';
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
      <DocumentIndex />
    </Stack>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
