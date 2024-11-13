import { Stack } from '@mui/system';
import ContentHeader from 'src/components/content-header';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import DocumentUploadPage from 'src/sections/documents/documents-upload/documents-upload-page';
import type { Page as PageType } from 'src/types/page';
import { useAuth } from 'src/hooks/use-auth';
import DocumentsProvider from 'src/contexts/documents/documents-context';
import { ArrowLeft } from 'iconsax-react';
import { Typography } from '@mui/material';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { paths } from 'src/paths';

const Page: PageType = () => {
  const { user } = useAuth();
  const router = useRouter();
  const handleGoDocuments = useCallback(() => {
    router.push(paths.documents.index);
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
      <Stack
        direction={'row'}
        gap={2}
        marginLeft={3}
        marginTop={1}
        onClick={handleGoDocuments}
        className='cursor-pointer'
      >
        <ArrowLeft />
        <Typography>Quay lại</Typography>
      </Stack>
      <ContentHeader title='Tải lên tài liệu' description='Tải lên tài liệu của bạn' />
      <DocumentUploadPage />
    </Stack>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    <DocumentsProvider>{page}</DocumentsProvider>
  </DashboardLayout>
);

export default Page;
