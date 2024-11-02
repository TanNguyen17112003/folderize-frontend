import { Box, Button } from '@mui/material';
import React, { memo, useMemo } from 'react';
import { CustomTable } from 'src/components/custom-table';
import type { Page as PageType } from 'src/types/page';

const VersionsTable: PageType = memo(() => {
  const rows = [
    {
      id: 'v1',
      version: '1.0',
      updated_at: '2023-07-01',
      changes: 'Initial release with core content',
      author: 'John Doe',
      docUrl: '/#'
    },
    {
      id: 'v2',
      version: '1.1',
      updated_at: '2023-09-15',
      changes: 'Added additional examples and updated formatting',
      author: 'Jane Smith',
      docUrl: '/#'
    },
    {
      id: 'v3',
      version: '2.0',
      updated_at: '2024-01-10',
      changes: 'Major update with new chapters and sections',
      author: 'John Doe',
      docUrl: '/#'
    }
  ];

  const configs = useMemo(
    () => [
      { key: 'version', headerLabel: 'Version' },
      { key: 'updated_at', headerLabel: 'Updated At' },
      { key: 'changes', headerLabel: 'Changes' },
      { key: 'author', headerLabel: 'Author' }
    ],
    []
  );

  const handleViewDoc = (docUrl: string) => {
    window.open(docUrl, '_blank');
  };

  return (
    <Box sx={{ py: 4 }}>
      <CustomTable
        rows={rows}
        configs={configs}
        renderRowActions={(row) => (
          <Button variant='outlined' onClick={() => handleViewDoc(row.docUrl)}>
            View
          </Button>
        )}
      />
    </Box>
  );
});

VersionsTable.getLayout = (page: any) => <>{page}</>;
export default VersionsTable;
