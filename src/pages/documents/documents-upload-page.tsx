import { Stack } from '@mui/system';
import ContentHeader from 'src/components/content-header';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import DocumentUploadPage from 'src/sections/documents/documents-upload/documents-upload-page';
import type { Page as PageType } from 'src/types/page';
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
      <ContentHeader title='Tải lên tài liệu' description='Tải lên tài liệu của bạn' />
      <DocumentUploadPage />
    </Stack>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
