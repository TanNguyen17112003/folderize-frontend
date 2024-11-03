import { Box, Container, Typography } from '@mui/material';
import { memo, useMemo } from 'react';
import { useRouter } from 'next/router';
import CustomTabs, { TabOption } from 'src/components/CustomTabs/CustomTabs';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import type { Page as PageType } from 'src/types/page';
import Comments from 'src/sections/documents/comments';
import DetailsTable from 'src/sections/documents/details';
import VersionsTable from 'src/sections/documents/versions';

const DocumentDetailsPage: PageType = memo(() => {
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    return (
      <Container maxWidth='lg'>
        <Box sx={{ py: 4 }}>
          <Typography>Document not found</Typography>
        </Box>
      </Container>
    );
  }

  const options: TabOption[] = useMemo(
    () => [
      {
        value: 'details',
        label: 'Details',
        content: <DetailsTable documentID={id.toString()} />
      },
      {
        value: 'versions',
        label: 'Versions',
        content: <VersionsTable />
      },
      {
        value: 'comments',
        label: 'Comments',
        content: <Comments />
      }
    ],
    [id]
  );

  return (
    <Container maxWidth='lg'>
      <Box sx={{ py: 4 }}>
        <CustomTabs options={options} tabsListClassName='grid grid-cols-3 w-full' />
      </Box>
    </Container>
  );
});
DocumentDetailsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default DocumentDetailsPage;
