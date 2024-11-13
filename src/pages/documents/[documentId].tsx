import { Box, Container, Stack, Typography } from '@mui/material';
import { memo, useCallback, useMemo } from 'react';
import CustomTabs, { TabOption } from 'src/components/CustomTabs/CustomTabs';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import type { Page as PageType } from 'src/types/page';
import Comments from 'src/sections/documents/documents-detail/documents-detail-comments';
import DetailsTable from 'src/sections/documents/documents-detail';
import VersionsTable from 'src/sections/documents/documents-detail/documents-detail-versions';
import ContentHeader from 'src/components/content-header';
import { useDocumentsContext } from 'src/contexts/documents/documents-context';
import { useRouter } from 'next/router';
import { ArrowLeft } from 'iconsax-react';
import { paths } from 'src/paths';
import { DocumentDetail } from 'src/types/document';
import CustomFileViewer from 'src/components/FileViewer'; // Import the FileViewer component

const DashboardPage: PageType = memo(() => {
  const router = useRouter();
  const { getDocumentsApi } = useDocumentsContext();
  const foundDocument = useMemo(() => {
    return getDocumentsApi.data?.find((doc) => doc.id == Number(router.query.documentId));
  }, [router, getDocumentsApi.data]);
  const options: TabOption[] = useMemo(
    () => [
      {
        value: 'details',
        label: 'Thông tin cơ bản',
        content: <DetailsTable document={foundDocument as DocumentDetail} />
      },
      {
        value: 'versions',
        label: 'Phiên bản',
        content: <VersionsTable />
      },
      {
        value: 'comments',
        label: 'Bình luận',
        content: <Comments />
      }
    ],
    [foundDocument]
  );

  const handleGoDocuments = useCallback(() => {
    router.push(paths.documents.index);
  }, []);

  return (
    <Stack className='bg-white min-h-screen'>
      <Stack>
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
        <ContentHeader title={`Chi tiết tài liệu ${foundDocument?.id}`} />
      </Stack>
      <Box sx={{ py: 4 }}>
        <CustomTabs options={options} />
      </Box>
    </Stack>
  );
});

DashboardPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default DashboardPage;
