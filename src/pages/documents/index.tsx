import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import type { Page as PageType } from 'src/types/page';
import { Box, Stack } from '@mui/material';
import ContentHeader from 'src/components/content-header';
import DocumentListIndex from 'src/sections/documents/index';
import DocumentsProvider from 'src/contexts/documents/documents-context';
import { useRouter } from 'next/router';
import DocumentDetail from './[documentId]';
const Page: PageType = () => {
  const router = useRouter();
  return (
    <>
      {router.query.documentId ? (
        <DocumentDetail />
      ) : (
        <Stack
          sx={{
            maxHeight: '100vh',
            overflow: 'auto',
            bgcolor: 'white'
          }}
          className='min-h-screen'
        >
          <DocumentListIndex />
        </Stack>
      )}
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    <DocumentsProvider>{page}</DocumentsProvider>
  </DashboardLayout>
);

export default Page;
