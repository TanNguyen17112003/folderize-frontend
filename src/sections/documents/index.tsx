import { Add } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { Stack } from '@mui/system';
import Link from 'next/link';
import ContentHeader from 'src/components/content-header';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { paths } from 'src/paths';
import type { Page as PageType } from 'src/types/page';
import DocumentList from 'src/sections/documents/documents-list';
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
        title='Danh sách tài liệu'
        description='Danh sách tài liệu của bạn'
        rightSection={
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center'
            }}
          >
            <Button
              variant='contained'
              color='success'
              startIcon={<Add />}
              LinkComponent={Link}
              href={paths.documents['upload-page']}
            >
              Tải lên tài liệu
            </Button>
          </Box>
        }
      />
      <DocumentList />
    </Stack>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
