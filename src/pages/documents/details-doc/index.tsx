import { Box, Container } from '@mui/material';
import { memo, useMemo } from 'react';
import CustomTabs, { TabOption } from 'src/components/CustomTabs/CustomTabs';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import type { Page as PageType } from 'src/types/page';
import Comments from './comments';
import DetailsTable from './details';
import VersionsTable from './versions';

const DashboardPage: PageType = memo(() => {
  const options: TabOption[] = useMemo(
    () => [
      {
        value: 'details',
        label: 'Details',
        content: <DetailsTable />
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
    []
  );

  return (
    <Container maxWidth='lg'>
      <Box sx={{ py: 4 }}>
        <CustomTabs options={options} tabsListClassName='grid grid-cols-3 w-full' />
      </Box>
    </Container>
  );
});

DashboardPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default DashboardPage;
